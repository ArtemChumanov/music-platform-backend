import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackController } from './tracks.controller';

import { TracksService } from './tracks.service';
import { AlbumService } from '../Albums/album.service';
import { PlaylistsService } from '../Playlists/playlist.service';
import { ArtistService } from '../Artists/artist.service';

import { PlaylistSchema } from '../Playlists/playlist.model';
import { ArtistSchema } from '../Artists/artist.model';
import { AlbumSchema } from '../Albums/album.model';
import { TrackSchema } from './tracks.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Track', schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: 'Album', schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: 'Playlist', schema: PlaylistSchema }]),
    MongooseModule.forFeature([{ name: 'Artist', schema: ArtistSchema }]),
  ],
  controllers: [TrackController],
  providers: [TracksService, AlbumService, PlaylistsService, ArtistService],
})
export class TracksModule {}
