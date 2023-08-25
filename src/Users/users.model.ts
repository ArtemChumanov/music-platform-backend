import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from './dto/user-role';

@Schema()
export class User {
  @Prop({ required: true, min: 4 })
  name: string;

  @Prop({ default: UserRoles.USER })
  role: UserRoles;

  @Prop({ required: true, unique: true, min: 5 })
  email: string;

  @Prop({ required: true })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User).set(
  'versionKey',
  false,
);
