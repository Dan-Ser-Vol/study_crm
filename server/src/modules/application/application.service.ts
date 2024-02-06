import { Injectable } from '@nestjs/common';
import { application } from 'express';

import { Application, Comment, Manager } from '../../database/schemas';
import { ApplicationRepository } from './application-repository';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepo: ApplicationRepository) {}
  async getAll(query: SortByQueryDto) {
    return this.applicationRepo.getAll(query);
  }
  async createComment(
    applicationId: string,
    comment: Comment,
    manager: Manager,
  ): Promise<Application> {
    return this.applicationRepo.addComment(applicationId, comment, manager);
  }

  async deleteComment(applicationId: string, commentId: string): Promise<void> {
    await this.applicationRepo.deleteComment(applicationId, commentId);
  }
}
