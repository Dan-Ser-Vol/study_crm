import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common';
import {Application, Manager} from '../../database/schemas';
import { ApplicationService } from './application.service';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';

@ApiTags('Applications')
@UseGuards(AuthGuard())
@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}
  @ApiOperation({ summary: 'Get all applications' })
  @ApiResponse({
    description: 'Successful response',
  })
  @Get()
  async getAll(@Query() query: SortByQueryDto) {
    return this.applicationService.getAll(query);
  }

  @ApiOperation({ summary: 'Add manager to application' })
  @ApiResponse({
    description: 'Successful response',
  })
  @Post('addManager')
  async addManager(
    @CurrentUser() manager: Manager,
    @Body('appId') appId: string,
  ): Promise<Application> {
    return await this.applicationService.addManager(appId, manager);
  }
}
