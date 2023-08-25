import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  artist: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsNotEmpty()
  @IsString()
  audioSrc: string;
}

export class UpdateTrackDto {
  @IsString()
  name: string;

  @IsString()
  artist: string;

  @IsString()
  image: string;

  @IsString()
  text: string;

  @IsString()
  audioSrc: string;

  @IsNumber()
  listens: number;
}

export class AddTrackDto {
  @IsNotEmpty()
  @IsString()
  slug: string;
}
