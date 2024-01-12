import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Application, ApplicationSchema } from '../../database/schemas';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
