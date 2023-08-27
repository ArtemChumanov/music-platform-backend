import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { PlaylistsService } from './playlist.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePlaylistDto, UpdatePlaylistDto } from './dto/playlist.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  EXAMPLE_PLAYLIST_BODY,
  EXAMPLE_PLAYLIST_RESPONSE,
} from './playlist.swagger.example';

@ApiTags('CRUD for playlist')
@ApiBearerAuth('access-token')
@Controller('playlist')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @ApiOperation({ summary: 'Створити блок Playlist' })
  @ApiBody({ schema: { example: EXAMPLE_PLAYLIST_BODY } })
  @ApiResponse({ schema: { example: EXAMPLE_PLAYLIST_RESPONSE } })
  @Post('/createPlaylist')
  @UseGuards(AuthGuard('jwt'))
  async addPlaylist(@Body() createPlaylistDto: CreatePlaylistDto) {
    return await this.playlistsService.insertPlaylist(createPlaylistDto);
  }

  @ApiOperation({ summary: 'Get all Playlists' })
  @ApiResponse({
    type: 'array',
    schema: { example: [EXAMPLE_PLAYLIST_RESPONSE] },
  })
  @Get('/getPlaylists')
  @UseGuards(AuthGuard('jwt'))
  async getAllPlaylists() {
    return await this.playlistsService.getPlaylists();
  }

  @ApiOperation({ summary: 'Get current Playlist' })
  @Get('/getPlaylist/:slug')
  @UseGuards(AuthGuard('jwt'))
  getPlaylist(@Param('slug') slug: string) {
    return this.playlistsService.getCurrentPlaylist(slug);
  }

  @ApiOperation({ summary: 'Update current Playlist' })
  @Patch('/updatePlaylist/:slug')
  @UseGuards(AuthGuard('jwt'))
  async updatePlaylist(
    @Param('slug') slug: string,
    @Body() updateFields: UpdatePlaylistDto,
  ) {
    await this.playlistsService.updatePlaylistBySlug(slug, updateFields);
    return null;
  }

  @ApiOperation({ summary: 'Delete current Playlist' })
  @Delete('deletePlaylist/:slug')
  @UseGuards(AuthGuard('jwt'))
  async deletePlaylist(@Param('slug') slug: string) {
    return await this.playlistsService.deletePlaylist(slug);
  }
}
