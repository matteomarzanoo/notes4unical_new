import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ActiveUserService } from '../../../features/users/shared/active-user.service';
import { UserRole } from '../model/user-role';

export const authGuard: CanActivateFn = (route, state) => {

  const currentUser = inject(ActiveUserService);
  const router = inject(Router);

  if (currentUser.getUser()) {
    if (currentUser.getUser()!.role === UserRole.ADMIN) {
      return true;
    } else if (currentUser.getUser()!.role === UserRole.USER) {
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
  } else {
    router.navigate(['login']);
    return false;
  }
};
