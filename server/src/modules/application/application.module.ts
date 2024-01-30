import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import {
  Application,
  ApplicationSchema,
  Message,
  MessageSchema,
} from '../../database/schemas';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationRepository } from './application-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationRepository],
})
export class ApplicationModule {}
