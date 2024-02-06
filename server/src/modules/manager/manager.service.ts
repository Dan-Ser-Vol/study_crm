import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Manager } from '../../database/schemas';
import { RegisterDto } from '../auth/dto';

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Manager.name) private managerModel: Model<Manager>,
  ) {}

  public async create(dto: RegisterDto): Promise<Manager> {
    await this.checkIfManagerExists(dto.email);
    const newManager = await this.managerModel.create(dto);
    return newManager.save();
  }

  public async validateManager(data: string): Promise<Manager> {
    const findManager = await this.findManagerByEmail(data);
    if (!findManager) {
      throw new UnprocessableEntityException('Manager entity not found');
    }
    return findManager;
  }

  public async findManagerByEmail(email: string): Promise<Manager> {
    const findManager = await this.managerModel
      .findOne({ email })
      .populate({ path: 'roles' })
      .exec();
    if (!findManager) {
      throw new UnprocessableEntityException(
        'No manager found with these credentials',
      );
    }

    return findManager;
  }

  public async findManagerById(managerId: string): Promise<Manager> {
    const findManager = await this.managerModel
      .findById(managerId)
      .populate({ path: 'roles' })
      .exec();
    if (!findManager) {
      throw new UnprocessableEntityException(
        'No manager found with these credentials',
      );
    }
    return findManager;
  }

  public async checkIfManagerExists(email: string): Promise<void> {
    const findManager = await this.managerModel.findOne({ email });
    if (findManager) {
      throw new HttpException('Manager already exists', HttpStatus.CONFLICT);
    }
  }
}
