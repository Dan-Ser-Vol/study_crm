import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CommonConfigModule } from '../../config/commonConfig/config.module';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import {UserService} from "../user/user.service";
import {AuthService} from "./auth.service";
import {BearerStrategy} from "../../common";

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
