import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ListItemsDto } from '../../common';
import { Application } from '../../database/schemas';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
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
        .populate('msg manager')
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
}
