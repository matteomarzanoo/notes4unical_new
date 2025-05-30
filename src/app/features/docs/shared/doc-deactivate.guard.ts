import { CanDeactivateFn } from '@angular/router';

export const docDeactivateGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
