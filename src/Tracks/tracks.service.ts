import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track } from './tracks.model';
import { CreateTrackDto } from './dto/tracks.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel('Track') private readonly trackModel: Model<Track>,
  ) {}

  async insertTrack(data: CreateTrackDto) {
    const newTrack = new this.trackModel(data);
    return await newTrack.save();
  }

  async getTracks() {
    try {
      return this.trackModel.aggregate([
        {
          $lookup: {
            from: 'artists',
            localField: 'artist',
            foreignField: '_id',
            as: 'artist',
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
            slug: 1,
            artist: 1,
            image: 1,
            text: 1,
            audioSrc: 1,
            listens: 1,
          },
        },
      ]);
    } catch (e) {
      return new BadRequestException();
    }
  }

  async getTrackBySlug(slug): Promise<any> {
    try {
      const track = await this.trackModel
        .findOne({
          slug: slug,
        })
        .exec();
      if (!track) return new NotFoundError('track not found');

      return track;
    } catch (e) {
      return new BadRequestException().getResponse();
    }
  }

  async updateTrack(slug, updatedFields) {
    return this.trackModel.updateOne({ slug }, { $set: updatedFields });
  }

  async deleteTrack(slug: string) {
    return this.trackModel.deleteOne({ slug });
  }

  async listenedTrack(slug: string) {
    this.trackModel.updateOne({ slug }, { $inc: { listens: 1 } });
    return { listened: true };
  }
}
