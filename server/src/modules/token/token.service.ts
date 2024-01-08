import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

import { ITokens } from '../../common/interfaces/tokens-interface';
import { User } from '../../database/schemas/user.schema';

@Injectable()
export class TokenService {
  constructor(
    @InjectRedisClient()
    private readonly redisClient: RedisClient,
    private readonly jwtService: JwtService,
  ) {}

  public async signTokens(data: User): Promise<ITokens> {
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
    return { accessToken, refreshToken };
  }

  public async saveTokensToRedis(
    email: string,
    tokens: ITokens,
  ): Promise<void> {
    await this.redisClient.setEx(email, 6000, tokens.accessToken);
    await this.redisClient.setEx(email, 604800, tokens.refreshToken);
  }
}
