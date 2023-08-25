import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Track {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  artist: string;

  @Prop()
  image?: string;

  @Prop()
  text: string;

  @Prop()
  audioSrc?: string;

  @Prop({ default: 0 })
  listens: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track).set(
  'versionKey',
  false,
);
