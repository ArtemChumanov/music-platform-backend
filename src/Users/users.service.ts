import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import { CreateUserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { CreateException } from '../common/exceptions/http.exception';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(data: CreateUserDto) {
    try {
      const passwordHash = bcrypt.hashSync(data.password, 5);

      return await this.userModel.create({
        ...data,
        password: passwordHash,
      });
    } catch (error) {
      if (error.code === 11000)
        return new CreateException(
          'User with this email already exist',
        ).getResponse();
      return new BadRequestException('incorrect data').getResponse();
    }
  }
  async getUserByParam(arg) {
    const res = await this.userModel.findOne(arg);
    return res;
  }

  async getUsers() {
    return await this.userModel.find().exec();
  }
}
