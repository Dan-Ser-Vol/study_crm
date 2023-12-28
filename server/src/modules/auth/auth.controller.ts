import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ITokens } from '../../common/interfaces/tokens-interface';
import { User } from '../../database/schemas/user.schema';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user.register-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: User,
  })
  @Post()
  async register(@Body() dto: UserRegisterDto): Promise<ITokens> {
    try {
      return await this.authService.register(dto);
    } catch (err) {
      Logger.log(err);
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
