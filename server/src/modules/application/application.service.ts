import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Application, Manager } from '../../database/schemas';
import { ApplicationRepository } from './application-repository';
import { CreateMessageDto } from './dto/request/create-message.dto';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepo: ApplicationRepository) {}
  async getAll(query: SortByQueryDto) {
    return this.applicationRepo.getAll(query);
  }
  async createMessage(
    id: string,
    message: string,
    manager: Manager,
  ): Promise<Application> {
    return this.applicationRepo.addMessage(id, message, manager);
  }
}
