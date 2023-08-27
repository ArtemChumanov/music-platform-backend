import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Playlist } from './playlist.model';
import { CreatePlaylistDto, UpdatePlaylistDto } from './dto/playlist.dto';
import { TracksService } from '../Tracks/tracks.service';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel('Playlist') private readonly playlistModel: Model<Playlist>,
    private readonly tracksService: TracksService,
  ) {}

  async getPlaylistAggregation(
    slug?: string,
    limit: number = null,
  ): Promise<Playlist[] | Playlist> {
    return this.playlistModel.aggregate([
      { $match: slug ? { slug } : {} },
      { $limit: limit ?? 1000 },
      {
        $lookup: {
          from: 'tracks',
          localField: 'tracks',
          foreignField: '_id',
          as: 'tracks',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          slug: 1,
          image: 1,
          tracks: 1,
        },
      },
    ]);
  }
  async insertPlaylist(createPlaylistDto: CreatePlaylistDto) {
    const newProduct = new this.playlistModel(createPlaylistDto);
    return await newProduct.save();
  }

  async getPlaylists() {
    return this.getPlaylistAggregation();
  }

  async getCurrentPlaylist(playlistSlug: string) {
    const playlist = (await this.getPlaylistAggregation(
      playlistSlug,
      1,
    )) as Playlist[];
    return playlist?.length
      ? playlist
      : new NotFoundException({
          message: 'Not found playlist by slug',
        }).getResponse();
  }

  async updatePlaylistBySlug(
    playlistId: string,
    updateFields: UpdatePlaylistDto,
  ) {
    return this.playlistModel.updateOne(
      {
        slug: playlistId,
      },
      { $set: updateFields },
    );
  }

  async deletePlaylist(playlistId: string) {
    return this.playlistModel.deleteOne({ slug: playlistId });
  }

  async addTrackToPlaylist(playlistSlug: string, trackSlug: string) {
    const track = await this.tracksService.getTrackBySlug(trackSlug);
    const playlist = await this.getPlaylistAggregation(playlistSlug, 1);

    console.log(playlist, track);
    if (!track || !playlist) {
      return new BadRequestException({
        message: 'not found album or playlist',
      }).getResponse();
    }

    // @ts-ignore
    if (!playlist.tracks.includes(track.id)) {
      return this.playlistModel.updateOne(
        {
          slug: playlistSlug,
        },
        {
          $push: {
            tracks: track.id,
          },
        },
      );
    }
  }
}
