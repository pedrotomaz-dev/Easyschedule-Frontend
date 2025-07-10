import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redireciona para /login se não estiver autenticado
  return router.parseUrl('/login');
};
