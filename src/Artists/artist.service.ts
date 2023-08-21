import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from './artist.model';
import { InsertArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel('Artist') private readonly artistModel: Model<Artist>,
  ) {}

  async getArtists() {
    return this.artistModel.aggregate([
      {
        $lookup: {
          from: 'artists',
          localField: 'artists',
          foreignField: '_id',
          as: 'artists',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          avatar: 1,
        },
      },
    ]);
  }

  async getArtistBySlug(slug) {
    return await this.artistModel
      .findOne({
        slug: slug,
      })
      .exec();
  }

  async insertArtist(insertArtistDto: InsertArtistDto) {
    const newArtist = new this.artistModel(insertArtistDto);
    const result = await newArtist.save();
    return result.id as string;
  }
}
