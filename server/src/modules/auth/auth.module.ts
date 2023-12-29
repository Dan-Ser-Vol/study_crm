import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from '@webeleon/nestjs-redis';

import { BearerStrategy } from '../../common/bearer.strategy';
import { CommonConfigModule } from '../../config/commonConfig/config.module';
import { CommonConfigService } from '../../config/commonConfig/config.service';
import { User, UserSchema } from '../../database/schemas/user.schema';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    CommonConfigModule,
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
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
  controllers: [AuthController],
  providers: [AuthService, BearerStrategy, PassportModule, UserService],
})
export class AuthModule {}
