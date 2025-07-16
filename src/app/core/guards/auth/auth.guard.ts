import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/core/services/customs/auth.service';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (authService.loadSessionStorage()) {
    return true;
  }
  return authService.loadSessionProtected().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        hanldeValidSession(messageService);
        return true;
      } else {
        handleInvalidSession(messageService);
        return router.createUrlTree(['/']);
      }
    }),
    catchError(error => {
      console.error('AuthGuard: Error during API validation:', error);
      handleConnectionError(messageService);
      return of(router.createUrlTree(['/']));
    })
  );
};

const hanldeValidSession = (messageService: MessageService) => {
  messageService.add({
    severity: 'contrast',
    summary: 'Inicio de Sesión',
    detail: 'Has iniciado sesión satisfactoriamente.',
    life: 1000
  });
}

const handleInvalidSession = (messageService: MessageService) => {
  messageService.add({
    severity: 'contrast',
    summary: 'Sesión Inválida',
    detail: 'Tu sesión no es válida o ha caducado. Por favor, inicia sesión.',
    life: 5000
  });
}

const handleConnectionError = (messageService: MessageService) => {
  messageService.add({
    severity: 'contrast',
    summary: 'Error de Conexión',
    detail: 'No se pudo verificar tu sesión. Intenta de nuevo más tarde.',
    life: 7000
  });
}
