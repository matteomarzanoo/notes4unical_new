import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';

export const docActivateGuard: CanActivateFn = (route, state) => { 
  return inject(AuthService).isLoggedIn() ? true : inject(Router).createUrlTree(['login']);
};