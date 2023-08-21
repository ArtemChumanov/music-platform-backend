import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Track } from '../Tracks/tracks.model';

@Schema()
export class Artist {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop({ default: 'default.svg' })
  avatar?: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
