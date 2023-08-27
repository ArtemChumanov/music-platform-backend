import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import distFile from '../utils/fieldsDist';
import { existsSync } from 'fs';

@ApiTags('CRUD for album')
@ApiBearerAuth('access-token')
@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({ summary: 'Отримати всі альбоми' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { type: 'array', example: [EXAMPLE_ALBUM_RESPONSE] },
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/getAlbums')
  async getAlbums() {
    return this.albumService.getAlbums();
  }

  @ApiOperation({ summary: 'Отримати альбом by slug' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { type: 'object', example: EXAMPLE_ALBUM_RESPONSE },
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/getAlbum/:slug')
  async getAlbumBySlug(@Param('slug') slug: string) {
    return this.albumService.getAlbumBySlug(slug);
  }

  @ApiOperation({ summary: 'Сворити альбом(адмін)' })
  @ApiBody({ schema: { example: EXAMPLE_ALBUM_BODY } })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: { example: EXAMPLE_ALBUM_RESPONSE },
  })
  @Post('/admin/createAlbum')
  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @ApiUnsupportedMediaTypeResponse()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        photo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Uploud image album' })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }], distFile),
  )
  @Put('updatePhoto/:slug')
  uploadPhoto(
    @Param('slug') slug: string,
    @UploadedFiles() img,
  ): Promise<string> {
    const photoUrl = img.photo[0] ? img.photo[0].filename : null;

    return this.albumService.updatePhoto(photoUrl, slug);
  }

  @ApiParam({ name: 'filename' })
  @ApiOperation({
    description: 'отримати аватарку',
  })
  @Get('/photo/:filename')
  async seeUploadedFile(@Param('filename') filename, @Res() res: Response) {
    if (!!filename) {
      const fileExist = existsSync(`./uploadedFiles/avatars/${filename}`);

      if (fileExist) {
        return res.sendFile(filename, { root: './uploadedFiles/avatars/' });
      }
    }
    throw new NotFoundException();
  }
}
