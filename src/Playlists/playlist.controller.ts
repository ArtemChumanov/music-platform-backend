import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { PlaylistsService } from './playlist.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePlaylistDto, UpdatePlaylistDto } from './dto/playlist.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoles } from '../Users/dto/user-role';
import { RolesGuard } from '../guards/roles-guard';
import { Roles } from '../guards/roles.decorator';
import { TracksService } from '../Tracks/tracks.service';
import { CreateException } from '../common/exceptions/http.exception';

@ApiTags('CRUD for playlist')
@ApiBearerAuth('access-token')
@Controller('playlist')
export class PlaylistsController {
  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly trackService: TracksService,
  ) {}

  @ApiOperation({
    description: 'Створити блок Playlist',
  })
  @Post()
  async addPlaylist(@Body() createPlaylistDto: CreatePlaylistDto) {
    try {
      const generatedId = await this.playlistsService.insertPlaylist(
        createPlaylistDto,
      );

      return { id: generatedId };
    } catch (e) {
      throw new CreateException(`Cannot add new playlist. ${e.message}`);
    }
  }

  // @Roles(UserRoles.ADMIN, UserRoles.USER)
  // @UseGuards(RolesGuard)
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllPlaylists() {
    try {
      return await this.playlistsService.getPlaylists();
    } catch (e) {
      throw new CreateException(`Cannot edit article. ${e.message}`);
    }
  }

  @Get('/:id')
  getPlaylist(@Param('id') id: string) {
    return this.playlistsService.getCurrentPlaylist(id);
  }

  async updatePlaylist(
    @Param('id') prodId: string,
    @Body() updateFields: UpdatePlaylistDto,
  ) {
    await this.playlistsService.updatePlaylistBySlug(prodId, updateFields);
    return null;
  }

  @Delete(':id')
  async deletePlaylist(@Param('id') slug: string) {
    await this.playlistsService.deletePlaylist(slug);
    return null;
  }
}
