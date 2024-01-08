import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CurrentUser, RefreshTokenGuard, ITokens } from '../../common';
import { User } from '../../database/schemas/user.schema';
import { MeResponseDto } from '../user/dto/response/me.response-dto';
import { MeResponseMapper } from '../user/mappers/me-response.mapper';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: User,
  })
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<ITokens> {
    return await this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<ITokens> {
    return await this.authService.login(dto);
  }

  @UseGuards(AuthGuard())
  @Get('me')
  async me(@CurrentUser() user: User): Promise<MeResponseDto> {
    const result = await this.authService.getMe(user.email).catch((err) => {
      this.logger.error(err);
      return null;
    });
    return MeResponseMapper.meDto(result);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async getRefreshToken(@CurrentUser() user: User): Promise<ITokens> {
    return await this.authService.getRefreshToken(user).catch((err) => {
      this.logger.error(err);
      return null;
    });
  }
}
