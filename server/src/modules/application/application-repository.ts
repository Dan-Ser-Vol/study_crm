import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ListItemsDto } from '../../common';
import { Application, Comment, Manager } from '../../database/schemas';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';
import { CommentResponseDto } from './dto/response/comment-response.dto';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
  ) {}

  public async getAll(
    query: SortByQueryDto,
  ): Promise<ListItemsDto<Application>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
      );

      const {
        limit = 25,
        page = 1,
        sortedBy = '-created_at',
        ...searchObj
      } = queryObj;

      const validPage = Math.max(1, +page);
      const skip = limit * (validPage - 1);

      const queryBuilder = this.applicationModel
        .find(searchObj)
        .collation({ locale: 'en', strength: 2 })
        .limit(limit)
        .skip(skip)
        .sort(sortedBy);
      const [data, itemsFound, totalCount] = await Promise.all([
        queryBuilder.exec(),
        this.applicationModel.countDocuments(searchObj),
        this.applicationModel.countDocuments(),
      ]);

      const totalPages = Math.ceil(itemsFound / limit);

      return {
        totalPages,
        limit,
        itemsFound,
        totalCount,
        data,
      };
    } catch (err) {
      Logger.error(err);
      throw new HttpException(
        'Invalid sortBy provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

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
          { $push: { msg: newComment }, manager },
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
    console.log(applicationId, commentId);
    const result = await this.applicationModel.findByIdAndUpdate(
      applicationId,
      { $pull: { msg: commentId } },
    );
    if (!result) {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }
    await this.commentModel.findByIdAndDelete(commentId);
  }
}
