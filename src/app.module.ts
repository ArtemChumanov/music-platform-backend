import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistsModule } from './Playlists/playlist.module';
import { TracksModule } from './Tracks/tracks.module';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';
import { AlbumModule } from './Albums/album.module';
import { ArtistModule } from './Artists/artist.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './utils/allExcaptionFilter';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://artem:1111@cluster0.x6hlkpu.mongodb.net/MusicPlatform',
    ),
    TracksModule,
    PlaylistsModule,
    UsersModule,
    AuthModule,
    AlbumModule,
    ArtistModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
