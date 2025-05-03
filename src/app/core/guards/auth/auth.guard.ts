import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, filter, map, of, switchMap, take, tap, timeout } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/user.action';
import { selectUser } from '@store/selects/user.select';
import { AuthService } from '@app/core/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const authService = inject(AuthService);

  return store.select(selectUser).pipe(
    take(1),
    switchMap(user => {
      // Caso 1: Usuario ya en estado
      if (user) return of(true);

      // Caso 2: Verificar sessionStorage primero
      authService.loadSession();
      // Caso 3: Último recurso - Petición al backend
      store.dispatch(UserActions.protected());

      return store.select(selectUser).pipe(
        filter(u => u !== undefined),
        take(1),
        timeout(5000),
        map(u => !!u),
        catchError(() => of(false))
      );
    }),
    tap(authorized => {
      if (!authorized) {
        authService.clearSession();
        router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
      }
    })
  );
};
