import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.userData?.token;

  if (token) {
    return next(
      request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      }),
    );
  }
  return next(request);
};
