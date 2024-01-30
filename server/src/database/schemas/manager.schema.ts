import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { ManagerRoleEnum } from '../../modules/role/enum/role-enum';
import { Application } from './application';

export type ManagerDocument = Manager & Document;

@Schema({ timestamps: true })
export class Manager {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: string;

  @Prop({ type: String, required: true, maxlength: 12, minlength: 2 })
  name: string;

  @Prop({ type: String, required: true, maxlength: 12, minlength: 2 })
  surname: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, enum: ManagerRoleEnum })
  roles: ManagerRoleEnum.MANAGER[];

  @Prop({ type: Date, default: Date.now })
  last_login: Date;
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Application' }] })
  applications: Types.Array<Types.ObjectId | Application>;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
