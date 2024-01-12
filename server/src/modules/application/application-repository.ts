import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Application } from '../../database/schemas';
import { IList } from '../user/interfaces/list.interface';
import { ListQueryRequestDto } from './dto/request/order-list-query-dto';
import { OrderFieldEnum } from './enums/list-order-field.enum';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
  ) {}

  public async getAll(query: ListQueryRequestDto): Promise<IList<Application>> {
    const queryBuilder = this.applicationModel.find();

    switch (query.orderBy) {
      case OrderFieldEnum.createdAt:
        queryBuilder.sort({ createdAt: query.order === 'ASC' ? 1 : -1 });
        break;
    }

    if (query.search) {
      queryBuilder.where({ email: { $regex: new RegExp(query.search, 'i') } });
    }

    queryBuilder.limit(query.limit);
    queryBuilder.skip(query.offset);

    const [model, total] = await Promise.all([
      queryBuilder.exec(),
      this.applicationModel.countDocuments(),
    ]);

    return {
      model,
      total,
    };
  }
}
