import { CanActivateFn } from '@angular/router';

export const docActivateGuard: CanActivateFn = (route, state) => {
  return true;
};
