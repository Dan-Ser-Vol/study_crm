import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Manager, ManagerSchema } from '../../database/schemas';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]),
  ],
  providers: [ManagerService],
  controllers: [ManagerController],
  exports: [ManagerService, MongooseModule],
})
export class ManagerModule {}
