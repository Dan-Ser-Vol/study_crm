import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ITokens } from '../../common';
import { User } from '../../database/schemas/user.schema';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  public async register(dto: RegisterDto): Promise<ITokens> {
    await this.userService.checkIfUserExists(dto.email);
    const newUser = await this.userService.create({
      ...dto,
      password: await this.hashPassword(dto),
    });
    const tokens = await this.tokenService.signTokens(newUser);
    await this.tokenService.saveTokensToRedis(dto.email, tokens);
    return tokens;
  }

  public async login(dto: LoginDto): Promise<ITokens> {
    const findUser = await this.userService.findUserByEmail(dto.email);
    await this.comparePassword(dto.password, findUser.password);
    const tokens = await this.tokenService.signTokens(findUser);
    await this.tokenService.saveTokensToRedis(dto.email, tokens);
    return tokens;
  }

  public async getMe(email: string): Promise<User> {
    return await this.userService.findUserByEmail(email);
  }

  public async getRefreshToken(data: User): Promise<ITokens> {
    return await this.tokenService.signTokens(data);
  }

  private async hashPassword(data: RegisterDto): Promise<string> {
    try {
      if (!data || !data.password) {
        throw new Error('Invalid data for password hashing');
      }
      const salt = await bcrypt.genSalt(5);
      return await bcrypt.hash(data.password, salt);
    } catch (err) {
      Logger.log(err);
      throw new HttpException(
        'Wrong email  or password ',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async comparePassword(
    newPassword: string,
    oldPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(newPassword, oldPassword);
    } catch (err) {
      Logger.log(err);
      throw new HttpException(
        'Wrong email  or password ',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
