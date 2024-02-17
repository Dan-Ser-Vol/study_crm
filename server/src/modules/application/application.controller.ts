import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser, ListItemsDto } from '../../common';
import { Application } from '../../database/schemas';
import { ManagerDto } from '../manager/dto/manager-dto';
import { ApplicationService } from './application.service';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';
import { ApplicationResponseDto } from './dto/response/application-response.dto';

@ApiTags('Applications')
@UseGuards(AuthGuard())
@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}
  @ApiOperation({ summary: 'Get all applications' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: ListItemsDto<ApplicationResponseDto>,
  })
  @Get()
  async getAll(
    @Query() query: SortByQueryDto,
  ): Promise<ListItemsDto<ApplicationResponseDto>> {
    return this.applicationService.getAll(query);
  }

  @ApiOperation({ summary: 'Add manager to application' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: ApplicationResponseDto,
  })
  @Post('addManager')
  @ApiBody({ type: String, description: 'appId is ID of application' })
  async addCurrentManager(
    @CurrentUser() manager: ManagerDto,
    @Body('appId') appId: string,
  ): Promise<ApplicationResponseDto> {
    return await this.applicationService.addManager(appId, manager);
  }

  @ApiOperation({ summary: 'Get application by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: ApplicationResponseDto,
  })
  @Get(':appId')
  async getById(
    @Param('appId') appId: string,
  ): Promise<ApplicationResponseDto> {
    return this.applicationService.getById(appId);
  }

  @ApiOperation({ summary: 'Update application by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: ApplicationResponseDto,
  })
  @Put('update/:appId')
  @ApiBody({ type: Application, description: 'update by ID of application' })
  async updateById(
    @Param('appId') appId: string,
    @Body() data: Application,
  ): Promise<ApplicationResponseDto> {
    console.log(appId);
    return await this.applicationService.updateById(appId, data);
  }
}
