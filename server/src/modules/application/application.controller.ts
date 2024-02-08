import {
  Body,
  Controller,
  Delete,
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common';
import { Manager } from '../../database/schemas';
import { ApplicationService } from './application.service';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';
import { CommentResponseDto } from './dto/response/comment-response.dto';

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

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({
    description: 'Successful response',
  })
  @Post('comment/:id')
  async createComment(
    @Body('message') message: string,
    @Param('id') applicationId: string,
    @CurrentUser() manager: Manager,
  ): Promise<CommentResponseDto> {
    try {
      return this.applicationService.createComment(
        applicationId,
        message,
        manager,
      );
    } catch (err) {
      Logger.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'find comments by  array of id' })
  @ApiResponse({
    description: 'Successful response',
    type: 'Successful deleted',
  })
  @Post('comments/ids')
  async findCommentsById(
    @Body('ids') ids: string[],
  ): Promise<CommentResponseDto[]> {
    try {
      return await this.applicationService.findCommentsById(ids);
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({
    description: 'Successful response',
    type: 'Successful deleted',
  })
  @Delete('comment/:applicationId/:commentId')
  async deleteComment(
    @Param() param: { applicationId: string; commentId: string },
  ): Promise<void> {
    try {
      await this.applicationService.deleteComment(
        param.applicationId,
        param.commentId,
      );
    } catch (err) {
      Logger.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
