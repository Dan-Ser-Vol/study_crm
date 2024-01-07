import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ITokens } from '../../common/interfaces/tokens-interface';
import { User } from '../../database/schemas/user.schema';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user.login-dto';
import { UserRegisterDto } from './dto/user.register-dto';
import {CurrentUser} from "../../common/decorators/current-user.decorator";
import {MeResponseDto} from "../user/dto/response/me.response-dto";
import {MeResponseMapper} from "../user/mappers/me-response.mapper";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: User,
  })
  @Post('register')
  async register(@Body() dto: UserRegisterDto): Promise<ITokens> {
    return await this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  @Post('login')
  async login(@Body() dto: UserLoginDto): Promise<ITokens> {
    return await this.authService.login(dto);
  }
  @UseGuards(AuthGuard())
  @Get('me')
  async me(@CurrentUser() user: User): Promise<MeResponseDto> {
    const result = await this.authService.getMe(user.email)
    return MeResponseMapper.meDto(result);
  }
}
