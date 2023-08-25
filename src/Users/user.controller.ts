import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthUserDto, CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../Auth/auth.service';
import {
  EXAMPLE_CREATE_USER_RESPONSE,
  EXAMPLE_CREATE_USER_BODY,
  EXAMPLE_AUTH_USER_BODY,
  EXAMPLE_AUTH_USER_RESPONSE,
} from './users.swagger.examples';

@ApiTags('User registration, auth, get user data')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ schema: EXAMPLE_CREATE_USER_BODY })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: { example: EXAMPLE_CREATE_USER_RESPONSE },
  })
  @Post('/signUp')
  async createUser(@Body() creatUserDto: CreateUserDto) {
    return await this.userService.createUser(creatUserDto);
  }

  @ApiOperation({ summary: 'User Authorization' })
  @ApiBody({ schema: EXAMPLE_AUTH_USER_BODY })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: { example: EXAMPLE_AUTH_USER_RESPONSE },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('/signIn')
  async signIn(@Body() authUserDto: AuthUserDto) {
    return await this.authService.signIn(authUserDto);
  }

  @ApiOperation({ summary: 'Get User data' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { example: [EXAMPLE_CREATE_USER_RESPONSE] },
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
}
