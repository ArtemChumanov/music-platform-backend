import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from '../Albums/album.model';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistSchema } from './artist.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Artist', schema: ArtistSchema }]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
