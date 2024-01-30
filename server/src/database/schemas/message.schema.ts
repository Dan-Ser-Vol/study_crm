import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

import { Manager } from './manager.schema';

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Manager' })
  manager: Types.ObjectId | Manager;
  @Prop({ type: String })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
