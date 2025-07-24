import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/core/services/customs/auth.service';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { UsersService } from '../services/api/users.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);
  const user = authService.loadSessionStorage();

  if (!user) {
    // Redirige si no hay usuario
    return authService.loadSessionProtected().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          const newSession = authService.loadSessionStorage()
          if (newSession.estado) {
            hanldeValidSession(messageService);
            return true
          }
          return notActiveObservable(authService, messageService, router);
        } else {
          handleInvalidSession(messageService);
          return router.createUrlTree(['/']);
        }
      }),
      catchError(error => {
        handleConnectionError(messageService);
        return of(router.createUrlTree(['/']));
      })
    );
  }

  if (user.estado) {
    // Usuario activo - permite acceso
    return true;
  }

  // Usuario inactivo - realiza logout y redirige
  return notActiveObservable(authService, messageService, router);

};

const notActiveObservable = (authService: any, messageService: any, router: any) => {
  const APIUsers = inject(UsersService);
  return APIUsers.logoutUser().pipe(
    switchMap(() => {
      handleUnactiveSession(messageService);
      authService.clearSession();
      return of(router.createUrlTree(['/']));
    }),
    catchError(() => {
      handleConnectionError(messageService);
      return of(router.createUrlTree(['/']));
    })
  );
}

const hanldeValidSession = (messageService: MessageService) => {
  messageService.add({
    severity: 'success',
    summary: 'Inicio de Sesión',
    detail: 'Has iniciado sesión satisfactoriamente.',
    life: 1000
  });
}

const handleInvalidSession = (messageService: MessageService) => {
  messageService.add({
    severity: 'error',
    summary: 'Sesión Inválida',
    detail: 'Tu sesión no es válida o ha caducado. Por favor, inicia sesión.',
    life: 3000
  });
}

const handleUnactiveSession = (messageService: MessageService) => {
  messageService.add({
    severity: 'error',
    summary: 'Sesión Inválida',
    detail: 'Su usuario está desactivado, por favor, comunicarse con la administración o espere más tarde.',
    life: 3000
  });
}

const handleConnectionError = (messageService: MessageService) => {
  messageService.add({
    severity: 'error',
    summary: 'Error de Conexión',
    detail: 'No se pudo verificar tu sesión. Intenta de nuevo más tarde.',
    life: 5000
  });
}
