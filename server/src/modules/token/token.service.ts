import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

import { ITokens } from '../../common/interfaces/tokens-interface';
import { CommonConfigService } from '../../config/commonConfig/config.service';

@Injectable()
export class TokenService {
  constructor(
    private commonConfigService: CommonConfigService,
    @InjectRedisClient()
    private readonly redisClient: RedisClient,
    private readonly jwtService: JwtService,
  ) {}

  public async signTokens(data: any): Promise<ITokens> {
    const config = {
      access: {
        secret: this.commonConfigService.jwt_access_secret,
        expiresIn: this.commonConfigService.jwt_access_expires_in,
      },
      refresh: {
        secret: this.commonConfigService.jwt_refresh_secret,
        expiresIn: this.commonConfigService.jwt_refresh_expires_in,
      },
    };

    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync({ sub: data }, config.access),
      this.jwtService.signAsync({ sub: data }, config.refresh),
    ]);

    return { access, refresh };
  }

  public async saveTokensToRedis(
    userEmail: string,
    tokens: ITokens,
  ): Promise<void> {
    await this.redisClient.setEx(userEmail, 1000000, JSON.stringify(tokens));
  }
}
