import { Injectable } from '@nestjs/common';

import { Manager } from '../../database/schemas';
import { ApplicationRepository } from './application-repository';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';
import { CommentResponseDto } from './dto/response/comment-response.dto';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepo: ApplicationRepository) {}
  async getAll(query: SortByQueryDto) {
    return this.applicationRepo.getAll(query);
  }
  async createComment(
    applicationId: string,
    message: string,
    manager: Manager,
  ): Promise<CommentResponseDto> {
    return this.applicationRepo.createComment(applicationId, message, manager);
  }

  async findCommentsById(ids: string[]): Promise<CommentResponseDto[]> {
    return await this.applicationRepo.findCommentsById(ids);
  }
  async deleteComment(applicationId: string, commentId: string): Promise<void> {
    console.log(applicationId, commentId);
    await this.applicationRepo.deleteComment(applicationId, commentId);
  }
}
