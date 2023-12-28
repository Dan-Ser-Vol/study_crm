import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

import { UserRoleEnum } from '../../modules/role/enum/role-enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: [{ type: String, enum: UserRoleEnum, default: UserRoleEnum.ADMIN }],
  })
  roles: UserRoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
