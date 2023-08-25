import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './album.model';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/album.dto';
import { TracksService } from '../Tracks/tracks.service';
import { ExceptionHandler } from '@nestjs/core/errors/exception-handler';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel('Album') private readonly albumModel: Model<Album>,
    private readonly tracksService: TracksService,
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
    return await album.save();
  }

  async addTrackToAlbum(albumSlug: string, trackSlug: string) {
    const track = await this.tracksService.getTrackBySlug(trackSlug);
    const album = await this.getAlbumBySlug(albumSlug);

    if (!track || !album) {
      console.log(23);
      return new BadRequestException({
        message: 'not found album or track',
      }).getResponse();
    }

    if (!album.tracks.includes(track._id)) {
      await this.albumModel.updateOne(
        {
          slug: albumSlug,
        },
        {
          $push: {
            tracks: track?.id,
          },
        },
      );
      return this.getAlbumBySlug(albumSlug);
    } else {
      return new BadRequestException({
        message: 'track in album',
      }).getResponse();
    }
  }
}
