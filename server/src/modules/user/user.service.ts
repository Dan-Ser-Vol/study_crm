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
    await this.checkIfUserExists(dto.email);
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
    try {
      return await this.userModel.findOne({ email }).populate('roles').exec();
    } catch (err) {
      throw new UnprocessableEntityException('User entity not found');
    }
  }

  public async checkIfUserExists(email: string): Promise<void> {
    const findUser = await this.findUserByEmail(email);
    if (findUser) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
