import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BehaviorSubject, catchError, delayWhen, filter, finalize, map, of, race, switchMap, take, tap, timeout, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/user.action';
import { selectUser } from '@store/selects/user.select';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const loading$ = new BehaviorSubject<boolean>(true);

  return store.select(selectUser).pipe(
    switchMap(user => {
      if (user) return of(true);

      store.dispatch(UserActions.protected());
      return store.select(selectUser).pipe(
        filter(u => u !== undefined),
        take(1),
        timeout(3000),
        map(u => !!u),
        tap(authorized => {
          if (!authorized) router.navigate(['/']);
        }),
        finalize(() => loading$.next(false))
      );
    }),
    // Oculta la ruta hasta terminar la verificación
    delayWhen(() => loading$.pipe(filter(loading => !loading))),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
