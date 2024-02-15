import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CurrentUser } from '../../common';
import { Application, Manager } from '../../database/schemas';
import { CommentService } from './comment.service';
import { CommentResponseDto } from './dto/response/comment-response.dto';

@UseGuards(AuthGuard())
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({
    description: 'Successful response',
  })
  @Post('create/:id')
  async createComment(
    @Body('message') message: string,
    @Param('id') applicationId: string,
    @CurrentUser() manager: Manager,
  ): Promise<Application> {
    try {
      return this.commentService.createComment(applicationId, message, manager);
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
  @Post('/ids')
  async findCommentsById(
    @Body('ids') ids: string[],
  ): Promise<CommentResponseDto[]> {
    try {
      return await this.commentService.findCommentsById(ids);
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
  @Delete('/:applicationId/:commentId')
  async deleteComment(
    @Param() param: { applicationId: string; commentId: string },
  ): Promise<void> {
    try {
      await this.commentService.deleteComment(
        param.applicationId,
        param.commentId,
      );
    } catch (err) {
      Logger.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
