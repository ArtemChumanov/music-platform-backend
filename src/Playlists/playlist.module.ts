import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { PlaylistsController } from './playlist.controller';
import { PlaylistsService } from './playlist.service';
import { TracksService } from '../Tracks/tracks.service';
import { PlaylistSchema } from './playlist.model';
import { TrackSchema } from '../Tracks/tracks.model';
import { JwtStrategy } from '../Auth/jwt.strategy';
import { AuthModule } from '../Auth/auth.module';
import { TracksModule } from '../Tracks/tracks.module';

@Module({
  imports: [
    PassportModule,
    TracksModule,
    MongooseModule.forFeature([{ name: 'Playlist', schema: PlaylistSchema }]),
    MongooseModule.forFeature([{ name: 'Track', schema: TrackSchema }]),
    AuthModule,
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, TracksService, JwtStrategy],
})
export class PlaylistsModule {}
