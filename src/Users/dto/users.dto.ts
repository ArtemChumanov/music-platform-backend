import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class AuthUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
