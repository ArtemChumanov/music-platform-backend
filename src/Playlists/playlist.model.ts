import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Track } from '../Tracks/tracks.model';

@Schema()
export class Playlist {
  @Prop()
  title: string;

  @Prop()
  slug: string;

  @Prop({ default: 'default.png' })
  image: string;

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: Track.name, default: [] },
  ])
  tracks: [Track];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist).set(
  'versionKey',
  false,
);
