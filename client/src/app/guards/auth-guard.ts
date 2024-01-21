import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services';

export function authGuard(): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthSubj.value) {
      return true;
    }
    router.navigate(['/login']);
    return false;
  };
}
