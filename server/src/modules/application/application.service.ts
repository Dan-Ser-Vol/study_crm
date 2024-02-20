import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ListItemsDto } from '../../common';
import { Application } from '../../database/schemas';
import { EStatus } from '../../database/schemas/application/enums';
import { ManagerDto } from '../manager/dto/manager-dto';
import { ApplicationRepository } from './application-repository';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';
import { ApplicationResponseDto } from './dto/response/application-response.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
    private readonly applicationRepo: ApplicationRepository,
  ) {}
  async getAll(
    query: SortByQueryDto,
  ): Promise<ListItemsDto<ApplicationResponseDto>> {
    try {
      return this.applicationRepo.getAll(query);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async addManager(
    appId: string,
    manager: ManagerDto,
  ): Promise<ApplicationResponseDto> {
    try {
      const application = await this.applicationModel
        .findByIdAndUpdate({ _id: appId }, { manager, status: EStatus.IN_WORK })
        .populate('manager');

      if (!application) {
        throw new HttpException(
          'Application with such ID not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      return application;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getById(appId: string) {
    try {
      return this.applicationRepo.getById(appId);
    } catch (err) {
      Logger.log(err);
    }
  }
  async updateById(
    appId: string,
    data: Application,
  ): Promise<ApplicationResponseDto> {
    return await this.applicationRepo.updateById(appId, data);
  }
}
