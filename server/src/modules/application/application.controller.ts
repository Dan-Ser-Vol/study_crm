import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApplicationService } from './application.service';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';

@ApiTags('Applications')
@UseGuards(AuthGuard())
@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}
  @ApiOperation({ summary: 'Get all applications' })
  @Get()
  async getAll(@Query() query: SortByQueryDto) {
    return this.applicationService.getAll(query);
  }

  @Post('add')
  async addManagerField() {
    return this.applicationService.addManagerField();
  }
}
