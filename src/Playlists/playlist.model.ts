import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Track } from '../Tracks/tracks.model';

@Schema()
export class Playlist {
  @Prop()
  title: string;

  @Prop()
  slug: string;

  @Prop()
  image: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Track.name }])
  tracks: [Track];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
