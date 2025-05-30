import { HttpInterceptorFn } from '@angular/common/http';

export const docInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
