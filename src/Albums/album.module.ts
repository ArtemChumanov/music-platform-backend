import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TracksService } from '../Tracks/tracks.service';
import { AlbumSchema } from './album.model';
import { TrackSchema } from '../Tracks/tracks.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Album', schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: 'Track', schema: TrackSchema }]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, TracksService],
})
export class AlbumModule {}
