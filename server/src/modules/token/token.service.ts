import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

import { ITokens } from '../../common/interfaces/tokens-interface';

@Injectable()
export class TokenService {
  constructor(
    @InjectRedisClient()
    private readonly redisClient: RedisClient,
    private readonly jwtService: JwtService,
  ) {}

  public async signTokens(data: any): Promise<ITokens> {
    const access = this.jwtService.sign(data);
    const refresh = this.jwtService.sign(data);
    return { access, refresh };
  }

  public async saveTokensToRedis(tokens: ITokens): Promise<void> {
    await this.redisClient.setEx(tokens.access, 259200, tokens.access);
    await this.redisClient.setEx(tokens.refresh, 604800, tokens.refresh);
  }
}
