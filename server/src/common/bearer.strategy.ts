import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { Strategy } from 'passport-http-bearer';

import { User } from '../database/schemas/user.schema';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @InjectRedisClient()
    readonly redisClient: RedisClient,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async validate(token: string): Promise<User> {
    let user = null;
    try {
      if (!(await this.redisClient.exists(token))) {
        throw new UnauthorizedException();
      }
      await this.jwtService.verifyAsync(token);
      const tokenPayload = this.jwtService.decode(token);
      user = await this.userService.validateUser(tokenPayload);
    } catch (err) {
      Logger.error(err);
      throw new UnauthorizedException();
    }
    return user;
  }
}
