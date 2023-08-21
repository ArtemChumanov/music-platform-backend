import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from './dto/user-role';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ default: UserRoles.USER })
  role: UserRoles;

  @Prop()
  email: string;

  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
