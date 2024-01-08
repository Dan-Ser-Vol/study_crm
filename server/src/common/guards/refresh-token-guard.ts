import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { UserService } from '../../modules/user/user.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { refreshToken } = request.body;
    if (!refreshToken) {
      return false;
    }

    return this.validate(request, refreshToken);
  }

  private async validate(request: any, refreshToken: string): Promise<boolean> {
    await this.jwtService.verifyAsync(refreshToken);
    const decoded = await this.jwtService.decode(refreshToken);
    if (decoded) {
      const user = await this.userService.findUserByEmail(decoded.email);
      if (user) {
        request.user = user;
        return true;
      }
    }
    return false;
  }
}
