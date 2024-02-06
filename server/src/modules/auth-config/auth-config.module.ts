import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@webeleon/nestjs-redis';

import { CommonConfigModule } from '../../config/commonConfig/config.module';
import { CommonConfigService } from '../../config/commonConfig/config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [CommonConfigModule],
      useFactory: async (commonConfigService: CommonConfigService) => ({
        secret: commonConfigService.jwt_secret,
        signOptions: {
          expiresIn: commonConfigService.jwt_expires_in,
        },
      }),
      inject: [CommonConfigService],
    }),
    RedisModule.forRootAsync({
      imports: [CommonConfigModule],
      useFactory: async (commonConfigService: CommonConfigService) => {
        return {
          url: commonConfigService.redis_url,
        };
      },
      inject: [CommonConfigService],
    }),
  ],
  providers: [RedisModule],
  exports: [JwtModule, RedisModule],
})
export class AuthConfigModule {}
