import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePlaylistDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  image: string;
}
export class UpdatePlaylistDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  tracks: any;
}
