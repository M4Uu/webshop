import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectFeatureUser } from '../../../store/selects/user.select';
import { map } from 'rxjs';


// the route param give the root and you can use as if it were one root of express
// the state param drop information about the entire navigation tree
export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store)

  return store.select(selectFeatureUser).pipe(
    map(user => {
      if(!user) return false
      return true
    })
  )
};
