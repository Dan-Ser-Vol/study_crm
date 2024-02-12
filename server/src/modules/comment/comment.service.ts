import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Application, Comment, Manager } from '../../database/schemas';
import { EStatus } from '../../database/schemas/application/enums';
import { CommentResponseDto } from './dto/response/comment-response.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
  ) {}

  async createComment(
    applicationId: string,
    message: string,
    manager: Manager,
  ): Promise<CommentResponseDto> {
    try {
      const newComment = await this.commentModel.create({
        message,
        manager,
      });
      const application = await this.applicationModel
        .findByIdAndUpdate(
          { _id: applicationId },
          { $push: { msg: newComment }, manager, status: EStatus.IN_WORK },
          { new: true, upsert: true },
        )
        .populate('msg');
      if (!application) {
        throw new HttpException('Application not found', HttpStatus.NO_CONTENT);
      }
      return newComment;
    } catch (err) {
      Logger.log(err);
      throw new HttpException(
        'Application with such ID not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findCommentsById(ids: string[]): Promise<CommentResponseDto[]> {
    const results = await this.commentModel.find({ _id: { $in: ids } }).lean();
    if (!results.length) {
      throw new HttpException('Comments do not exist', HttpStatus.NO_CONTENT);
    }
    return results;
  }

  async deleteComment(applicationId: string, commentId: string): Promise<void> {
    const result = await this.applicationModel.findByIdAndUpdate(
      applicationId,
      { $pull: { msg: commentId } },
    );
    if (!result) {
      throw new HttpException('Comments not found', HttpStatus.NOT_FOUND);
    }
    await this.commentModel.findByIdAndDelete(commentId);
  }
}
