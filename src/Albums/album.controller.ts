import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/album.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  EXAMPLE_ALBUM_BODY,
  EXAMPLE_ALBUM_RESPONSE,
} from './album.swagger.examples';
import { Roles } from '../guards/roles.decorator';
import { UserRoles } from '../Users/dto/user-role';
import { RolesGuard } from '../guards/roles-guard';

@ApiTags('CRUD for album')
@ApiBearerAuth('access-token')
@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({ summary: 'Отримати всі альбоми' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { example: [EXAMPLE_ALBUM_RESPONSE] },
  })
  @Get()
  async getAlbums() {
    return this.albumService.getAlbums();
  }

  @ApiOperation({ summary: 'Отримати альбом by slug' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { example: EXAMPLE_ALBUM_RESPONSE },
  })
  @Get('/:slug')
  async getAlbumBySlug(@Param('slug') slug: string) {
    return this.albumService.getAlbumBySlug(slug);
  }

  @ApiOperation({ summary: 'Сворити альбом' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ schema: { example: EXAMPLE_ALBUM_BODY } })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: { example: EXAMPLE_ALBUM_RESPONSE },
  })
  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }
}
