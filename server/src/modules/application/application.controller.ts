import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common';
import { Manager, Message } from '../../database/schemas';
import { ApplicationService } from './application.service';
import { CreateMessageDto } from './dto/request/create-message.dto';
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

  @Post('message')
  async createMessage(
    @Body() dto: CreateMessageDto,
    @CurrentUser() manager: Manager,
  ): Promise<Message> {
    try {
      return this.applicationService.createMessage(dto, manager);
    } catch (err) {
      Logger.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
