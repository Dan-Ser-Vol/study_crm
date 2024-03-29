import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

import { ITokens } from '../../common';
import { Manager } from '../../database/schemas';

@Injectable()
export class TokenService {
  constructor(
    @InjectRedisClient()
    private readonly redisClient: RedisClient,
    private readonly jwtService: JwtService,
  ) {}

  public async signTokens(data: Manager): Promise<ITokens> {
    const accessToken = this.jwtService.sign({
      id: data._id,
      email: data.email,
      roles: data.roles,
    });
    const refreshToken = this.jwtService.sign({
      id: data._id,
      email: data.email,
      roles: data.roles,
    });
    await this.saveTokensToRedis(data.email, { accessToken, refreshToken });
    return { accessToken, refreshToken };
  }

  public async saveTokensToRedis(
    email: string,
    tokens: ITokens,
  ): Promise<void> {
    await this.redisClient.setEx(email, 6000, tokens.accessToken);
    await this.redisClient.setEx(email, 604800, tokens.refreshToken);
  }

  // public async findToken(email: string): Promise<void> {
  //   await this.redisClient.exists(email);
  // }
  //
  // public async deleteToken(email: string): Promise<void> {
  //   await this.redisClient.del(email);
  // }
}
