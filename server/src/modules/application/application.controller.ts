import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common';
import { Application, Manager } from '../../database/schemas';
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

  @Post('message/:id')
  async createMessage(
    @Body() data: { [key: string]: string },
    @Param('id') id: string,
    @CurrentUser() manager: Manager,
  ): Promise<Application> {
    try {
      return this.applicationService.createMessage(id, data.message, manager);
    } catch (err) {
      Logger.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
