import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, filter, map, of, take, tap, timeout } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/user.action';
import { selectUser } from '@store/selects/user.select';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  store.dispatch(UserActions.protected());

  return store.select(selectUser).pipe(
    filter(user => user !== undefined),
    take(1),
    timeout(2000),
    map(user => !!user),
    tap(authorized => {
      if (!authorized) {
        router.navigate(['/']);
      }
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
