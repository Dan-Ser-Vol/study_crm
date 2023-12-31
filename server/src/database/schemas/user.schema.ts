import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import {UserRoleEnum} from '../../modules/role/enum/role-enum';

export type UserDocument = User & Document;

@Schema({timestamps:true})
export class User {
    @Prop({type: SchemaTypes.ObjectId, auto: true})
    _id: string;

    @Prop({required: true})
    name: string;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({
        type: [String],
        enum: UserRoleEnum,
        default: [UserRoleEnum.ADMIN],
    })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
