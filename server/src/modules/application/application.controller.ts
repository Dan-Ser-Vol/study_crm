import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Applications')
@Controller('application')
export class ApplicationController {
  @ApiOperation({ summary: 'Get all applications' })
  @Get()
  async getAll() {
    return 'take all application)';
  }
}
