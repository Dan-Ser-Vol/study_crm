import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ListItemsDto } from '../../common';
import { Application } from '../../database/schemas';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';
import { ApplicationResponseDto } from './dto/response/application-response.dto';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
  ) {}

  public async getAll(
    query: SortByQueryDto,
  ): Promise<ListItemsDto<ApplicationResponseDto>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
      );

      const {
        limit = 25,
        page,
        sortedBy = '-created_at',
        ...searchObj
      } = queryObj;
      const validPage = Math.max(1, +page);
      const skip = limit * (validPage - 1);

      const queryBuilder = this.applicationModel
        .find(this.regexBuilder(searchObj))
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

  async getById(appId: string): Promise<ApplicationResponseDto> {
    try {
      return this.applicationModel.findById(appId);
    } catch (err) {
      throw new HttpException(
        'application with such id not exist ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateById(
    appId: string,
    data: Application,
  ): Promise<ApplicationResponseDto> {
    try {
      const updatedApplication = await this.applicationModel
        .findByIdAndUpdate(appId, data, { new: true })
        .exec();

      if (!updatedApplication) {
        throw new HttpException(
          'Application with such id not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedApplication;
    } catch (err) {
      throw new HttpException(
        'Failed to update application',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  regexBuilder(obj: SortByQueryDto): SortByQueryDto {
    const regexQueries = {};
    for (const objKey in obj) {
      if (objKey !== 'age') {
        const value = obj[objKey];
        regexQueries[objKey] = { $regex: value, $options: 'i' };
      } else {
        regexQueries[objKey] = obj[objKey];
      }
    }
    return regexQueries;
  }
}
