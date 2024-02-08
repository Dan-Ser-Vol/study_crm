import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Manager } from '../../database/schemas';
import { ManagerService } from './manager.service';

@Controller('managers')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @ApiOperation({ summary: 'get manager' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  @UseGuards(AuthGuard())
  @Get(':id')
  async manager(@Param('id') managerId: string): Promise<Manager> {
    return await this.managerService.findManagerById(managerId).catch((err) => {
      Logger.error(err);
      return null;
    });
  }
}
