import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

import { Manager } from '../manager.schema';

@Schema({ timestamps: true })
export class Comment {
  @Prop({
    type: String,
  })
  message: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Manager' })
  manager: Manager;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
