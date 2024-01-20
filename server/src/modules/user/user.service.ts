import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../../database/schemas';
import { RegisterDto } from '../auth/dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async create(dto: RegisterDto): Promise<User> {
    await this.checkIfUserExists(dto.email);
    const newUser = await this.userModel.create(dto);
    return newUser.save();
  }

  public async validateUser(data: string): Promise<User> {
    const findUser = await this.findUserByEmail(data);
    if (!findUser) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return findUser;
  }

  public async findUserByEmail(email: string): Promise<User> {
    const findUser = await this.userModel
      .findOne({ email })
      .populate({ path: 'roles' })
      .exec();
    if (!findUser) {
      throw new UnprocessableEntityException(
        'No user found with these credentials',
      );
    }

    return findUser;
  }

  public async checkIfUserExists(email: string): Promise<void> {
    const findUser = await this.userModel.findOne({ email });
    if (findUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
  }
}
