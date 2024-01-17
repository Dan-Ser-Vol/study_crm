import { Injectable } from '@nestjs/common';

import { ApplicationRepository } from './application-repository';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepo: ApplicationRepository) {}
  async getAll(query: SortByQueryDto) {
    return this.applicationRepo.getAll(query);
  }
}
