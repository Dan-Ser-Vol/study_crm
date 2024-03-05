import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ITokens } from '../../common';
import { Manager } from '../../database/schemas';
import { ManagerService } from '../manager/manager.service';
import { TokenService } from '../token/token.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private managerService: ManagerService,
    private tokenService: TokenService,
  ) {}

  public async register(dto: RegisterDto): Promise<ITokens> {
    await this.managerService.checkIfManagerExists(dto.email);
    const newManager = await this.managerService.create({
      ...dto,
      password: await this.hashPassword(dto),
    });
    const tokens = await this.tokenService.signTokens(newManager);
    await this.tokenService.saveTokensToRedis(dto.email, tokens);
    return tokens;
  }

  public async login(dto: LoginDto): Promise<ITokens> {
    const findManager = await this.managerService.findManagerByEmail(dto.email);
    const isMatched = await this.comparePassword(
      dto.password,
      findManager.password,
    );
    if (isMatched) {
      const tokens = await this.tokenService.signTokens(findManager);
      await this.tokenService.saveTokensToRedis(dto.email, tokens);
      return tokens;
    } else {
      throw new HttpException(
        'Wrong email or password ',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  public async getMe(email: string): Promise<Manager> {
    return await this.managerService.findManagerByEmail(email);
  }

  public async getRefreshToken(data: Manager): Promise<ITokens> {
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
