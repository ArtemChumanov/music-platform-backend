import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../Users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }) {
    const user = await this.usersService.getUserByParam({ email: email });
    // const user = await this.usersService.getUserByEmail({ email });
    if (!user) return null;
    const success = await bcrypt.compare(password, user.password);
    console.log(success);
    if (success) {
      const token = await this.jwtService.signAsync({ email, password });
      console.log(token);
      return {
        token: token,
        role: user.role,
        email: user.email,
      };
    }
    return null;
  }
}
