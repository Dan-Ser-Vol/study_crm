import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ListItemsDto } from '../../common';
import { Application, Manager } from '../../database/schemas';
import { EStatus } from '../../database/schemas/application/enums';
import { ManagerService } from '../manager/manager.service';
import { ApplicationRepository } from './application-repository';
import { SortByQueryDto } from './dto/request/sortBy-query-dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
    private readonly applicationRepo: ApplicationRepository,
    private readonly managersService: ManagerService,
  ) {}
  async getAll(query: SortByQueryDto): Promise<ListItemsDto<Application>> {
    try {
      return this.applicationRepo.getAll(query);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async addManager(appId: string, manager: Manager): Promise<Application> {
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
      console.log(application)
      return application;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
