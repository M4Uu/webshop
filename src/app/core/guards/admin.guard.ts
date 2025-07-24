import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UsersService } from '../services/api/users.service';
import { AuthService } from '../services/customs/auth.service';
import { catchError, map, of, Observable, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';

export const adminGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const user = authService.loadSessionStorage();

  // Caso 1: No hay usuario autenticado
  if (!user) {
    messageService.add({
      severity: 'warn',
      summary: 'Acceso denegado',
      detail: 'Debes iniciar sesión primero',
      life: 5000
    });
    return of(router.createUrlTree(['/']));
  }

  // Caso 2: Usuario inactivo
  if (!user.estado) {
    return handleInactiveUser(usersService, authService, router, messageService);
  }

  // Caso 3: Verificar roles de usuario activo
  return verifyAdminRole(user.cedula, usersService, router, messageService);
};

// Función para manejar usuarios inactivos
const handleInactiveUser = (
  usersService: UsersService,
  authService: AuthService,
  router: Router,
  messageService: MessageService
) => {
  return usersService.logoutUser().pipe(
    switchMap(() => {
      messageService.add({
        severity: 'error',
        summary: 'Sesión Inválida',
        detail: 'Su usuario está desactivado, por favor, comuníquese con la administración',
        life: 5000
      });
      authService.clearSession();
      return of(router.createUrlTree(['/']));
    }),
    catchError(() => {
      messageService.add({
        severity: 'error',
        summary: 'Error de Conexión',
        detail: 'Error al comunicarse con el servidor. Intente más tarde.',
        life: 5000
      });
      return of(router.createUrlTree(['/']));
    })
  );
};

// Función para verificar rol de administrador
const verifyAdminRole = (
  cedula: string,
  usersService: UsersService,
  router: Router,
  messageService: MessageService
) => {
  return usersService.getRolesUsuario(cedula).pipe(
    map(response => {
      const isAdmin = response.data.some((rol: any) => rol.rol_id === 2);

      if (isAdmin) {
        return true; // Acceso permitido
      } else {
        messageService.add({
          severity: 'error',
          summary: 'Acceso denegado',
          detail: 'No tienes permisos de administrador',
          life: 5000
        });
        return router.createUrlTree(['/usuarios']);
      }
    }),
    catchError(error => {
      messageService.add({
        severity: 'contrast',
        summary: 'Error de Conexión',
        detail: 'No se pudieron verificar tus credenciales',
        life: 7000
      });
      return of(router.createUrlTree(['/usuarios']));
    })
  );
};