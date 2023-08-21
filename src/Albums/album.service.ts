import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './album.model';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel('Album') private readonly albumModel: Model<Album>,
  ) {}

  async getAlbums() {
    return this.albumModel.aggregate([
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
          artist: 1,
          tracks: 1,
        },
      },
    ]);
  }
  async getAlbumBySlug(slug: string) {
    return await this.albumModel.findOne({ slug }).exec();
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const album = new this.albumModel(createAlbumDto);
    const result = await album.save();
    return result.id;
  }

  async addTrackToAlbum(albumSlug: string, trackId: any) {
    return this.albumModel.updateOne(
      {
        slug: albumSlug,
      },
      {
        $push: {
          tracks: trackId,
        },
      },
    );
  }
}
