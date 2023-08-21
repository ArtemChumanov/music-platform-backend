import { PlaylistsService } from '../Playlists/playlist.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/album.dto';

@ApiTags('CRUD for album')
// @ApiBearerAuth('access-token')
@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({
    description: 'Отримати всі альбоми',
  })
  @Get()
  async getAlbums() {
    return this.albumService.getAlbums();
  }

  @ApiOperation({
    description: 'Отримати альбом by slug',
  })
  @Get('/:slug')
  async getAlbumBySlug(@Param('slug') slug: string) {
    return this.albumService.getAlbumBySlug(slug);
  }

  @ApiOperation({
    description: 'Сворити альбом',
  })
  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    const generatedId = await this.albumService.createAlbum(createAlbumDto);
    return { id: generatedId };
  }
}
