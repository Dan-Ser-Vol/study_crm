import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApplicationService } from './application.service';
import {SortByQueryDto} from "./dto/request/sortBy-query-dto";


@ApiTags('Applications')
@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @ApiOperation({ summary: 'Get all applications' })
  @Get()
  async getAll(@Query() query: SortByQueryDto) {
    return this.applicationService.getAll(query);
  }
}
