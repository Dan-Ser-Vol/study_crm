import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../../database/schemas/user.schema';
import { UserRegisterDto } from '../auth/dto/user.register-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async create(dto: UserRegisterDto): Promise<User> {
    const findUser = await this.findUserByEmail(dto.email);
    if (findUser) {
      throw new HttpException(
        'This user already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = await this.userModel.create(dto);
    return newUser.save();
  }

  public async validateUser(data): Promise<User> {
    const findUser = await this.findUserByEmail(data.email);
    if (!findUser) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return findUser;
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).populate('roles').exec();
  }

  public async findUserOrException(userId: string): Promise<User> {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return findUser;
  }
}
