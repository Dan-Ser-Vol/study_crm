import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Application } from '../../database/schemas';
import { IList } from '../user/interfaces/list.interface';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
  ) {}

  public async getAll(query: SortByQueryDto): Promise<IList<Application>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
      );

      const { limit, page, ...searchObj } = queryObj;
      const skip = +limit * (+page - 1);
      const queryBuilder = this.applicationModel
        .find(searchObj)
        .limit(limit)
        .skip(skip)
        .sort(query.sortedBy);

      const [data, itemsFound, totalCount] = await Promise.all([
        queryBuilder.exec(),
        this.applicationModel.countDocuments(searchObj),
        this.applicationModel.countDocuments(),
      ]);

      const totalPages = Math.ceil(itemsFound / +limit);

      return {
        page,
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
}
