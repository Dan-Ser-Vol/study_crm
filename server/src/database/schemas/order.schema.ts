
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Order {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  course: string;

  @Prop({ required: true })
  course_format: string;

  @Prop({ required: true })
  course_type: string;

  @Prop()
  sum: number;

  @Prop()
  already_paid: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop()
  utm: string;

  @Prop()
  msg: string;

  @Prop()
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
