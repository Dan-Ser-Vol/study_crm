import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { Strategy } from 'passport-http-bearer';

import { Manager } from '../../database/schemas';
import { ManagerService } from '../../modules/manager/manager.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @InjectRedisClient()
    readonly redisClient: RedisClient,
    private readonly jwtService: JwtService,
    private readonly managerService: ManagerService,
  ) {
    super();
  }

  async validate(token: string): Promise<Manager> {
    let manager = null;
    try {
      await this.jwtService.verifyAsync(token);
      const tokenPayload = this.jwtService.decode(token);

      if (!(await this.redisClient.exists(tokenPayload.email))) {
        throw new UnauthorizedException();
      }
      manager = await this.managerService.validateManager(tokenPayload.email);
    } catch (err) {
      Logger.error(err);
      throw new UnauthorizedException();
    }
    return manager;
  }
}
