import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Manager, Message } from '../../database/schemas';
import { ApplicationRepository } from './application-repository';
import { CreateMessageDto } from './dto/request/create-message.dto';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    private readonly applicationRepo: ApplicationRepository,
  ) {}
  async getAll(query: SortByQueryDto) {
    return this.applicationRepo.getAll(query);
  }
  async createMessage(
    dto: CreateMessageDto,
    manager: Manager,
  ): Promise<Message> {
    const message = await this.messageModel.create({
      ...dto,
      manager: manager,
    });
    return message.save();
  }
}
