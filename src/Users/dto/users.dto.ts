import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class AuthUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
