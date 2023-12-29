import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserRoleEnum } from '../../modules/role/enum/role-enum';

export type UserDoc = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [String],
    enum: UserRoleEnum,
    default: [UserRoleEnum.ADMIN],
  })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
