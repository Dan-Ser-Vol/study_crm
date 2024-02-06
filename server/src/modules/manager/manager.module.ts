import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { BearerStrategy } from '../../common';
import { Manager, ManagerSchema } from '../../database/schemas';
import { AuthConfigModule } from '../auth-config/auth-config.module';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports: [
    AuthConfigModule,
    MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]),
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
  ],
  providers: [ManagerService, BearerStrategy],
  controllers: [ManagerController],
  exports: [ManagerService, MongooseModule, PassportModule],
})
export class ManagerModule {}
