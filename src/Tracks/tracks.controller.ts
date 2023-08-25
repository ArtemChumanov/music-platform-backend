import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddTrackDto, CreateTrackDto, UpdateTrackDto } from './dto/tracks.dto';
import { TracksService } from './tracks.service';
import { AlbumService } from '../Albums/album.service';
import { PlaylistsService } from '../Playlists/playlist.service';
import {
  EXAMPLE_CREATE_TRACK_BODY,
  EXAMPLE_CREATE_TRACK_RESPONSE,
  EXAMPLE_GET_TRACKS_RESPONSE,
} from './config/track.config';

@ApiTags('CRUD for track')
@Controller('track')
export class TrackController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumService: AlbumService,
    private readonly playlistService: PlaylistsService,
  ) {}

  @ApiOperation({ summary: 'Create track' })
  @ApiBody({ schema: EXAMPLE_CREATE_TRACK_BODY })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: { example: EXAMPLE_CREATE_TRACK_RESPONSE },
  })
  @Post('/create')
  async addTrack(@Body() trackData: CreateTrackDto) {
    return await this.tracksService.insertTrack(trackData);
  }

  @ApiOperation({
    summary: 'Get all tracks',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: { type: 'array', example: EXAMPLE_GET_TRACKS_RESPONSE },
  })
  @Get()
  async getAllTracks() {
    return await this.tracksService.getTracks();
  }

  @ApiOperation({
    summary: 'Get track by slug',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: { example: EXAMPLE_CREATE_TRACK_RESPONSE },
  })
  @Get('/:slug')
  async getCurrentTrack(@Param('slug') slug: string) {
    return await this.tracksService.getTrackBySlug(slug);
  }

  @ApiOperation({
    summary: 'Update track by slug',
  })
  @Put(':slug')
  async updateTrackBySlug(
    @Param('slug') slug: string,
    @Body() updatedFields: UpdateTrackDto,
  ) {
    return await this.tracksService.updateTrack(slug, updatedFields);
  }

  @ApiOperation({
    summary: 'delete track by slug',
  })
  @Delete('/:slug')
  async deletePlaylist(@Param('slug') slug: string) {
    await this.tracksService.deleteTrack(slug);
    return null;
  }

  @ApiOperation({ summary: 'add track in album' })
  @ApiResponse({ schema: { example: {} } })
  @Patch('addTrackToAlbum/:trackSlug')
  async addTrackToAlbum(
    @Query('trackSlug') trackSlug: string,
    @Query('albumSlug') albumSlug: string,
  ) {
    return await this.albumService.addTrackToAlbum(albumSlug, trackSlug);
  }

  @ApiOperation({ summary: 'add track in playlist' })
  @Patch('addTrackToPlaylist/:trackSlug')
  async addTrackToPlaylist(
    @Query('trackSlug') trackSlug: string,
    @Query('playlistSlug') playlistSlug: string,
  ) {
    const track = await this.tracksService.getTrackBySlug(trackSlug);
    // await this.playlistService.addTrackToPlaylist(playlistSlug, track.id);
  }

  @ApiOperation({ summary: 'user listened track' })
  @Patch('listened/:slug')
  async listenedTrack(@Param('slug') slug: string) {
    await this.tracksService.listenedTrack(slug);
  }
}
