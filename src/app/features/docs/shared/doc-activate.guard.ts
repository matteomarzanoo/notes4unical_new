import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { inject } from '@angular/core';
import { UserRole } from '../../../core/auth/model/user-role';
import { firstValueFrom } from 'rxjs';

export const docActivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole:UserRole[] = route.data['requiredRoles']

  return firstValueFrom(authService.getUser())
    .then(user => {
      if (!user) {
        router.navigate(['/login'])
      }

      if (user) {
        if (!expectedRole) {
          return true;
        }

        if (expectedRole[1] == user.authorities[0].authority) {
          return true;
        }

        return false;
      }

      return false;
    })
    .catch(_ => router.navigate(['/login']))
};