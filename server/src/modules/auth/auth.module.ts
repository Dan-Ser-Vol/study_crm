import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { BearerStrategy } from '../../common';
import { CommonConfigModule } from '../../config/commonConfig/config.module';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    TokenModule,
    CommonConfigModule,
    TokenModule,
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, BearerStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
