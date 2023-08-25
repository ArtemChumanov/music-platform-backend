import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Track } from '../Tracks/tracks.model';

@Schema()
export class Album {
  @Prop()
  name: string;

  @Prop({ unique: true })
  slug: string;

  @Prop()
  artist: string;

  @Prop()
  image: string;

  @Prop()
  text: string;

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: Track.name, default: [] },
  ])
  tracks: [Track];
}

export const AlbumSchema = SchemaFactory.createForClass(Album).set(
  'versionKey',
  false,
);
