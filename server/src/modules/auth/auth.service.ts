import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import * as bcrypt from 'bcrypt';

import { ITokens } from '../../common/interfaces/tokens-interface';
import { CommonConfigService } from '../../config/commonConfig/config.service';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from './dto/user.register-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private commonConfigService: CommonConfigService,
    @InjectRedisClient()
    private readonly redisClient: RedisClient,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: UserRegisterDto): Promise<ITokens> {
    const findUser = await this.userService.findUserByEmail(dto.email);
    if (findUser) {
      throw new HttpException(
        'User already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const newUser = await this.userService.create({
      ...dto,
      password: hashPassword,
    });
    const tokens = await this.signIn({ email: newUser.email });
    await this.redisClient.setEx(tokens.access, 1000000000, tokens.access);
    await this.redisClient.setEx(tokens.refresh, 1000000000, tokens.refresh);
    return tokens;
  }

  public async signIn(data: any): Promise<ITokens> {
    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(
        { sub: data },
        {
          secret: this.commonConfigService.jwt_access_secret,
          expiresIn: this.commonConfigService.jwt_access_expires_in,
        },
      ),
      this.jwtService.signAsync(
        { sub: data },
        {
          secret: this.commonConfigService.jwt_refresh_secret,
          expiresIn: this.commonConfigService.jwt_refresh_expires_in,
        },
      ),
    ]);
    return { access, refresh };
  }
}
