import { IsNotEmpty, IsString } from 'class-validator';

export class InsertArtistDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  avatar?: string;
}
