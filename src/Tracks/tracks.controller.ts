import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddTrackDto, CreateTrackDto, UpdateTrackDto } from './dto/tracks.dto';
import { TracksService } from './tracks.service';
import { AlbumService } from '../Albums/album.service';
import { PlaylistsService } from '../Playlists/playlist.service';

@ApiTags('CRUD for track')
@Controller('track')
export class TrackController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumService: AlbumService,
    private readonly playlistService: PlaylistsService,
  ) {}

  @ApiOperation({
    description: 'Create track',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        slug: {
          type: 'string',
        },
        artist: {
          type: 'string',
        },
        image: {
          type: 'string',
        },
        text: {
          type: 'string',
        },
        audioSrc: {
          type: 'string',
        },
        listens: {
          type: 'number',
        },
      },
    },
  })
  @Post('/create')
  async addTrack(@Body() trackData: CreateTrackDto) {
    return await this.tracksService.insertTrack(trackData);
  }

  @ApiOperation({
    description: 'Get all tracks',
  })
  @Get()
  async getAllTracks() {
    return await this.tracksService.getTracks();
  }

  @ApiOperation({
    description: 'Get track by slug',
  })
  @Get('/:slug')
  async getCurrentTrack(@Param('slug') slug: string) {
    return await this.tracksService.getTrackBySlug(slug);
  }

  @ApiOperation({
    description: 'Update track by slug',
  })
  @Patch(':slug')
  async updateTrackBySlug(
    @Param('slug') slug: string,
    @Body() updatedFields: UpdateTrackDto,
  ) {
    return await this.tracksService.updateTrack(slug, updatedFields);
  }

  @ApiOperation({
    description: 'delete track by slug',
  })
  @Delete('/:slug')
  async deletePlaylist(@Param('slug') slug: string) {
    await this.tracksService.deleteTrack(slug);
    return null;
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
        },
      },
    },
  })
  @Patch('addTrackToAlbum/:trackSlug')
  async addTrackToAlbum(
    @Param('trackSlug') slug: string,
    @Body() addTrackDto: AddTrackDto,
  ) {
    const track = await this.tracksService.getTrackBySlug(slug);
    await this.albumService.addTrackToAlbum(addTrackDto.slug, track.id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
        },
      },
    },
  })
  @Patch('addTrackToPlaylist/:trackSlug')
  async addTrackToPlaylist(
    @Param('trackSlug') slug: string,
    @Body() addTrackDto: AddTrackDto,
  ) {
    const track = await this.tracksService.getTrackBySlug(slug);
    await this.playlistService.addTrackToPlaylist(addTrackDto.slug, track.id);
  }

  @Put('listened/:slug')
  async listenedTrack(@Param('slug') slug: string) {
    await this.tracksService.listenedTrack(slug);
  }
}
