import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UsersService } from '../services/api/users.service';
import { AuthService } from '../services/customs/auth.service';
import { catchError, map, of, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

export const adminGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const APIUsuarios = inject(UsersService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const user = authService.loadSessionStorage();

  // Verificar si hay usuario autenticado
  if (!user) {
    messageService.add({
      severity: 'warn',
      summary: 'Acceso denegado',
      detail: 'Debes iniciar sesión primero',
      life: 5000
    });
    return of(router.createUrlTree(['/']));
  }

  return APIUsuarios.getRolesUsuario(user.cedula).pipe(
    map((response) => {
      const isAdmin = response.data.some((rol: any) => rol.rol_id === 2);

      if (isAdmin) {
        return true; // Permitir acceso
      } else {
        messageService.add({
          severity: 'error',
          summary: 'Acceso denegado',
          detail: 'No tienes permisos de administrador',
          life: 5000
        });
        return router.createUrlTree(['/usuarios']); // Redirigir
      }
    }),
    catchError((error) => {
      console.error('AdminGuard: Error de conexión', error);
      messageService.add({
        severity: 'contrast',
        summary: 'Error de Conexión',
        detail: 'No se pudieron verificar tus credenciales. Intenta de nuevo más tarde.',
        life: 7000
      });
      return of(router.createUrlTree(['/usuarios'])); // Redirigir a página de error
    })
  );
};
