import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ITokens } from '../../common/interfaces/tokens-interface';
import { User } from '../../database/schemas/user.schema';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/user.login-dto';
import { UserRegisterDto } from './dto/user.register-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  public async register(dto: UserRegisterDto): Promise<ITokens> {
    await this.userService.checkIfUserExists(dto.email);
    const newUser = await this.userService.create({
      ...dto,
      password: await this.hashPassword(dto),
    });
    const tokens = await this.tokenService.signTokens(newUser.email);
    await this.tokenService.saveTokensToRedis(tokens);
    return tokens;
  }

  public async login(dto: UserLoginDto): Promise<ITokens> {
    const findUser = await this.userService.findUserByEmail(dto.email);
    await this.comparePassword(dto.password, findUser.password);
    const tokens = await this.tokenService.signTokens(dto.email);
    await this.tokenService.saveTokensToRedis(tokens);
    return tokens;
  }

  public async getMe(email: string): Promise<User> {
    return await this.userService.findUserByEmail(email);
  }

  private async hashPassword(data: UserRegisterDto): Promise<string> {
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
