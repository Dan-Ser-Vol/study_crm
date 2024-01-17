import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

import { Manager } from '../manager.schema';
import { ECurses, ECursesFormat, ECursesType, EStatus } from './enums';

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  surname: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({
    type: String,
    enum: Object.values(ECurses),
    required: true,
    default: ECurses.FS,
  })
  course: ECurses;

  @Prop({
    type: String,
    enum: Object.values(ECursesFormat),
    required: true,
    default: ECursesFormat.ONLINE,
  })
  course_format: string;

  @Prop({
    type: String,
    enum: Object.values(ECursesType),
    default: ECursesType.PRO,
    required: true,
  })
  course_type: string;

  @Prop({ type: Number })
  sum: number;

  @Prop({ type: Number })
  already_paid: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: String })
  utm: string;

  @Prop({ type: String })
  msg: string;

  @Prop({ type: String, enum: Object.values(EStatus), default: EStatus.NEW })
  status: EStatus;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Manager' })
  manager: Types.ObjectId | Manager;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
