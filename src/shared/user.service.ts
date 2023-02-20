import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from 'src/auth/auth.dto';
import { User } from 'src/types/user';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/payload';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  sanitizeUser(user: User) {
    /** Converts this document into a plain-old JavaScript object. */
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async create(userDto: RegisterDto) {
    const { username } = userDto;
    /** Finds one document. */
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(userDto);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(userDto: LoginDto) {
    const { username, password } = userDto;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: Payload) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }
}
