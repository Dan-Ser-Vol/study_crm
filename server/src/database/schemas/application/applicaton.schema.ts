import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

import { Manager } from '../manager.schema';
import { ECourses, ECursesFormat, ECursesType, EStatus } from './enums';

@Schema({ timestamps: true })
export class Application {
  @Prop({
    type: String,
    required: true,
    index: {
      collation: { locale: 'en', strength: 2 },
    },
  })
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
    enum: Object.values(ECourses),
    required: true,
    default: ECourses.FS,
  })
  course: ECourses;

  @Prop({
    type: String,
    enum: Object.values(ECursesFormat),
    required: true,
    default: ECursesFormat.ONLINE,
  })
  course_format: ECursesFormat;

  @Prop({
    type: String,
    enum: Object.values(ECursesType),
    default: ECursesType.PRO,
    required: true,
  })
  course_type: ECursesType;

  @Prop({ type: Number })
  sum: number;

  @Prop({ type: Number })
  already_paid: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: String })
  utm: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Comment' }] })
  msg: Comment[];

  @Prop({ type: String, enum: Object.values(EStatus), default: EStatus.NEW })
  status: EStatus;

  @Prop({ type: String })
  group: EStatus;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Manager' })
  manager: Manager;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
