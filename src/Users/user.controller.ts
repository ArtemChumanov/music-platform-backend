import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUserDto, CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../Auth/auth.service';

@ApiTags('User registration, auth, get user data')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    description: 'User registration',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  @Post('/signUp')
  async createUser(@Body() creatUserDto: CreateUserDto) {
    const generatedId = await this.userService.createUser(creatUserDto);
    return { id: generatedId };
  }

  @ApiOperation({
    description: 'User Authorization',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  @Post('/signIn')
  async signIn(@Body() authUserDto: AuthUserDto) {
    return await this.authService.signIn(authUserDto);
  }

  @ApiOperation({
    description: 'Get User data',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
}
