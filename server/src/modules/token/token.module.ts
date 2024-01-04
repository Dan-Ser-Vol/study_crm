import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@webeleon/nestjs-redis';

import { CommonConfigModule } from '../../config/commonConfig/config.module';
import { CommonConfigService } from '../../config/commonConfig/config.service';
import { TokenService } from './token.service';

@Module({
  imports: [
    CommonConfigModule,
    RedisModule.forRootAsync({
      imports: [CommonConfigModule],
      useFactory: async (commonConfigService: CommonConfigService) => {
        return {
          url: commonConfigService.redis_url,
        };
      },
      inject: [CommonConfigService],
    }),
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
  ],
  providers: [RedisModule, TokenService],
  exports: [RedisModule, TokenService, JwtModule],
})
export class TokenModule {}
