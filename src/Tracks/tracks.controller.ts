import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks.dto';
import { TracksService } from './tracks.service';
import { AlbumService } from '../Albums/album.service';
import { PlaylistsService } from '../Playlists/playlist.service';
import {
  EXAMPLE_CREATE_TRACK_BODY,
  EXAMPLE_CREATE_TRACK_RESPONSE,
  EXAMPLE_GET_TRACKS_RESPONSE,
  EXAMPLE_UPDATE_TRACK_BODY,
  EXAMPLE_UPLOAD_BODY,
} from './track.swagger.examples';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles-guard';
import { Roles } from '../guards/roles.decorator';
import { UserRoles } from '../Users/dto/user-role';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import distFile from '../utils/fieldsDist';
import { Response } from 'express';
import { existsSync } from 'fs';

@ApiTags('CRUD for track')
@ApiBearerAuth('access-token')
@Controller('track')
export class TrackController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumService: AlbumService,
    private readonly playlistService: PlaylistsService,
  ) {}

  @ApiOperation({ summary: 'Create track' })
  @ApiBody({ schema: { example: EXAMPLE_CREATE_TRACK_BODY } })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'audio', maxCount: 1 }], distFile),
  )
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: { example: EXAMPLE_CREATE_TRACK_RESPONSE },
  })
  @Post('/createTrack')
  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async addTrack(@Body() trackData: CreateTrackDto) {
    return await this.tracksService.insertTrack(trackData);
  }

  @ApiOperation({ summary: 'upload track' })
  @ApiUnsupportedMediaTypeResponse()
  @ApiConsumes('multipart/form-data')
  @ApiBody(EXAMPLE_UPLOAD_BODY)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'audio', maxCount: 1 }], distFile),
  )
  @Put('/updateTrackSrc/:trackSlug')
  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async uploadTrack(
    @Param('trackSlug') trackSlug: string,
    @UploadedFiles() audioSrc,
  ) {
    const audioUrl = audioSrc.audio[0] ? audioSrc.audio[0].filename : null;
    return this.tracksService.updateTrackSrc(trackSlug, audioUrl);
  }

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: { type: 'array', example: EXAMPLE_GET_TRACKS_RESPONSE },
  })
  @Get('/getTracks')
  async getAllTracks() {
    return await this.tracksService.getTracks();
  }

  @ApiOperation({ summary: 'Get track by slug' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: { example: EXAMPLE_CREATE_TRACK_RESPONSE },
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('getTrack/:slug')
  async getCurrentTrack(@Param('slug') slug: string) {
    return await this.tracksService.getTrackBySlug(slug);
  }

  @ApiOperation({ summary: 'Update track by slug' })
  @ApiBody({ schema: { example: EXAMPLE_UPDATE_TRACK_BODY } })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: { example: EXAMPLE_CREATE_TRACK_RESPONSE },
  })
  @Patch('/updateTrack/:slug')
  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateTrackBySlug(
    @Param('slug') slug: string,
    @Body() updatedFields: UpdateTrackDto,
  ) {
    return await this.tracksService.updateTrack(slug, updatedFields);
  }

  @ApiOperation({ summary: 'delete track by slug' })
  @Delete('/deleteTrack/:slug')
  async deletePlaylist(@Param('slug') slug: string) {
    return await this.tracksService.deleteTrack(slug);
  }

  @ApiOperation({ summary: 'add track in album' })
  @ApiResponse({ schema: { example: {} } })
  @UseGuards(AuthGuard('jwt'))
  @Patch('/addTrackToAlbum/:trackSlug')
  async addTrackToAlbum(
    @Query('trackSlug') trackSlug: string,
    @Query('albumSlug') albumSlug: string,
  ) {
    return await this.albumService.addTrackToAlbum(albumSlug, trackSlug);
  }

  @ApiOperation({ summary: 'add track in playlist' })
  @Patch('/addTrackToPlaylist/:trackSlug')
  @UseGuards(AuthGuard('jwt'))
  async addTrackToPlaylist(
    @Query('trackSlug') trackSlug: string,
    @Query('playlistSlug') playlistSlug: string,
  ) {
    return await this.playlistService.addTrackToPlaylist(
      playlistSlug,
      trackSlug,
    );
  }

  @ApiOperation({ summary: 'user listened track' })
  @Patch('listened/:slug')
  @UseGuards(AuthGuard('jwt'))
  async listenedTrack(@Param('slug') slug: string) {
    await this.tracksService.listenedTrack(slug);
  }

  @ApiOperation({ summary: 'get track by fileName' })
  @Get('/getTrackStream/:filename')
  @UseGuards(AuthGuard('jwt'))
  async seeUploadedFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    if (!!filename) {
      const fileExist = existsSync(`./uploadedFiles/tracks/${filename}`);

      if (fileExist) {
        return res.sendFile(filename, { root: './uploadedFiles/tracks/' });
      }
    }
    throw new NotFoundException();
  }
}
