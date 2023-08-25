import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { InsertArtistDto } from './dto/artist.dto';

@ApiTags('CRUD for artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistsService: ArtistService) {}

  @ApiOperation({
    description: 'Додати артиста',
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
        avatar: {
          type: 'string',
        },
      },
    },
  })
  @Post()
  async addArtist(@Body() insertArtistDto: InsertArtistDto) {
    const generatedId = await this.artistsService.insertArtist(insertArtistDto);
    return { id: generatedId };
  }

  @ApiOperation({
    description: 'Get All artists',
  })
  @Get()
  async getArtists() {
    return this.artistsService.getArtists();
  }
}
