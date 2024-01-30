import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CurrentUser,
  ITokens,
  LogoutGuard,
  RefreshTokenGuard,
} from '../../common';
import { Manager } from '../../database/schemas';
import { MeResponseDto } from '../manager/dto/response/me.response-dto';
import { MeResponseMapper } from '../manager/mappers/me-response.mapper';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register new manager' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: Manager,
  })
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<ITokens> {
    return await this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Login manager' })
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
  async me(@CurrentUser() manager: Manager): Promise<MeResponseDto> {
    const result = await this.authService.getMe(manager.email).catch((err) => {
      this.logger.error(err);
      return null;
    });
    return MeResponseMapper.meDto(result);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async getRefreshToken(@CurrentUser() manager: Manager): Promise<ITokens> {
    return await this.authService.getRefreshToken(manager).catch((err) => {
      this.logger.error(err);
      return null;
    });
  }

  @UseGuards(AuthGuard(), LogoutGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successful response',
    type: 'The manager is logout',
  })
  @ApiOperation({ summary: 'Logout manager' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: 'The manager is logout',
  })
  @Post('logout')
  public async logout() {
    return;
  }
}
