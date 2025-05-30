import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { inject } from '@angular/core';
import { UserRole } from '../../../core/auth/model/user-role';
import { firstValueFrom } from 'rxjs';

export const docActivateGuard: CanActivateFn = (route, state) => {
  return true;
};