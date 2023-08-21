import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Playlist } from './playlist.model';
import { CreatePlaylistDto, UpdatePlaylistDto } from './dto/playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel('Playlist') private readonly playlistModel: Model<Playlist>,
  ) {}

  async insertPlaylist(createPlaylistDto: CreatePlaylistDto) {
    const newProduct = new this.playlistModel(createPlaylistDto);
    const result = await newProduct.save();
    return result.id as string;
  }

  async getPlaylists() {
    return this.playlistModel.aggregate([
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
          _id: 0,
          title: 1,
          slug: 1,
          image: 1,
          tracks: 1,
        },
      },
    ]);
  }

  async getCurrentPlaylist(playlistId: string) {
    return await this.playlistModel
      .findOne({
        slug: playlistId,
      })
      .exec();
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

  async addTrackToPlaylist(playlistSlug: string, trackId: any) {
    return this.playlistModel.updateOne(
      {
        slug: playlistSlug,
      },
      {
        $push: {
          tracks: trackId,
        },
      },
    );
  }
}
