import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './album.model';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/album.dto';
import { TracksService } from '../Tracks/tracks.service';
import unbindImageByAddress from '../utils/unbindImages';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel('Album') private readonly albumModel: Model<Album>,
    private readonly tracksService: TracksService,
  ) {}

  async getAlbums(options: any = {}): Promise<Album | Album[]> {
    return this.albumModel.aggregate([
      { $match: options },
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
          name: 1,
          slug: 1,
          artist: 1,
          tracks: 1,
        },
      },
    ]);
  }

  async getCurrentAlbum(slug: string) {
    return await this.getAlbums({ slug: slug });
  }

  async getAlbumBySlug(slug: string) {
    const album = this.getCurrentAlbum(slug);
    if (!album)
      return new NotFoundException({
        status: 404,
        message: 'Not Found album by slug',
      }).getResponse();

    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const album = new this.albumModel(createAlbumDto);
    return await album.save();
  }

  async addTrackToAlbum(albumSlug: string, trackSlug: string) {
    const track = await this.tracksService.getTrackBySlug(trackSlug);
    const album = await this.albumModel.findOne({ slug: albumSlug }).exec();

    if (!track || !album) {
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

  async updatePhoto(photoUrl, albumSlug) {
    const album = (await this.getCurrentAlbum(albumSlug)) as Album;
    const oldPhoto = album.image;

    if (!!photoUrl) {
      const result = await this.albumModel.updateOne(
        { slug: albumSlug },
        { image: photoUrl },
      );
      console.log(result);
      if (!!oldPhoto /*&& !!result.affected*/) {
        if (oldPhoto != 'default.png') {
          await unbindImageByAddress(oldPhoto);
        }
      } else {
        await unbindImageByAddress(photoUrl);
      }
      return photoUrl;
    }
    return oldPhoto;
  }
}
