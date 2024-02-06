import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import {
  Application,
  ApplicationSchema,
  Comment,
  CommentSchema,
} from '../../database/schemas';
import { ManagerModule } from '../manager/manager.module';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationRepository } from './application-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
    ManagerModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationRepository],
})
export class ApplicationModule {}
