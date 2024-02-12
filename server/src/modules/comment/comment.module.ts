import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import {
  Application,
  ApplicationSchema,
  Comment,
  CommentSchema,
} from '../../database/schemas';
import { ApplicationModule } from '../application/application.module';
import { ManagerModule } from '../manager/manager.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

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
    ApplicationModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
