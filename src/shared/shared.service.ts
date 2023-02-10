import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private sanitizerUser(user: User) {
    // Takes a populated field and returns it to its unpopulated state.
    // If called with no arguments, then all populated fields are returned to their unpopulated state.
    return user.depopulate('password');
  }
}
