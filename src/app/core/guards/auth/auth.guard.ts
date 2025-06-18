import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router'; // Asegúrate de importar UrlTree y Router
import { AuthService } from '@app/core/services/auth/auth.service';
import { Observable, of } from 'rxjs'; // Importa Observable y of
import { map, catchError } from 'rxjs/operators'; // Importa map y catchError
import { MessageService } from 'primeng/api'; // Si también quieres mostrar un toast

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (authService.loadSessionStorage()) {
    return true;
  } else {
    return authService.loadSessionProtected().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          messageService.add({
            severity: 'contrast',
            summary: 'Inicio de Sesión',
            detail: 'Has iniciado sesión satisfactoriamente.',
            life: 2000
          });
          return true;
        } else {
          messageService.add({
            severity: 'contrast',
            summary: 'Sesión Inválida',
            detail: 'Tu sesión no es válida o ha caducado. Por favor, inicia sesión.',
            life: 5000
          });
          return router.createUrlTree(['/login']);
        }
      }),
      catchError(error => {
        console.error('AuthGuard: Error during API validation:', error);
        messageService.add({
          severity: 'contrast',
          summary: 'Error de Conexión',
          detail: 'No se pudo verificar tu sesión. Intenta de nuevo más tarde.',
          life: 7000
        });
        return of(router.createUrlTree([''])); // Redirige al login en caso de error
      })
    );
  }
};
