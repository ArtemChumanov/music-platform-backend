import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  artist: string;

  @IsString()
  image?: string;
}

export class AddTracksToAlbumDto {
  @IsNotEmpty()
  @IsString()
  slug: string;
}
