import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, switchMap, take, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../store/actions/user.action';
import { selectUser } from '../../../store/selects/user.select';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store)
  const router = inject(Router)
  if (typeof localStorage !== 'undefined'){
    store.select(selectUser).pipe(
      take(1),
      map(user => {
        if(user === undefined) {
          store.dispatch(UserActions.protected())
        }
      })
    )
  }

  return timer(1000).pipe(
    switchMap(() => {
      return store.select(selectUser).pipe(
        take(1),
        map(user => {
          if(user) {
            return true
          }
          router.navigate(['/login'])
          return false
        })
      )
    })
  )
};
