import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ITokens } from '../../common/interfaces/tokens-interface';
import { User } from '../../database/schemas/user.schema';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user.login-dto';
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
}
