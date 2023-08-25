import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../Users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }) {
    try {
      const user = await this.usersService.getUserByParam({ email: email });

      if (!user)
        return new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'User not found with this email',
        }).getResponse();
      const success = await bcrypt.compare(password, user.password);
      console.log(success);
      if (success) {
        const token = await this.jwtService.signAsync(
          { email, password },
          {
            secret: 'JWT_SECRET',
          },
        );
        return {
          access_token: token,
          role: user.role,
          email: user.email,
        };
      } else {
        return new BadRequestException('Not correct password').getResponse();
      }
    } catch (e) {
      throw new BadRequestException().getResponse();
    }
  }
}
