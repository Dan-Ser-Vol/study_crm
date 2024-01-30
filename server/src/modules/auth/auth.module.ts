import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { BearerStrategy } from '../../common';
import { CommonConfigModule } from '../../config/commonConfig/config.module';
import { ManagerModule } from '../manager/manager.module';
import { ManagerService } from '../manager/manager.service';
import { TokenModule } from '../token/token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ManagerModule,
    TokenModule,
    CommonConfigModule,
    TokenModule,
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
  ],
  controllers: [AuthController],
  providers: [ManagerService, AuthService, BearerStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
