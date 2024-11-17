import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "../../core/services/api-users/users.service";
import { UserActions } from "../actions/user.action";
import { catchError, delay, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { selectUser } from "../selects/user.select";

@Injectable()
export class UserEffects {
  actions$ = inject(Actions)
  ApiUser = inject(UsersService)
  store = inject(Store)
  router = inject(Router)

  register$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.register),
    mergeMap(action => this.ApiUser.registerUser(action.payload)
    .pipe(
      tap(response => UserActions.successData({ message: response.status })),
      catchError(error => of(UserActions.errorData({ message: error.message })))
    )),
  ))

  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    mergeMap(action => this.ApiUser.loginUser(action.payload)
    .pipe(
      map(() => UserActions.successData({ message: 'User logged succesfully' })),
      catchError(error => of(UserActions.errorData({ message: error.message })))
    )),
  ))

  protected$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.protected),
    delay(1000),
    mergeMap(() => this.ApiUser.protectedUser()
    .pipe(
      map(payload => UserActions.loadData({ payload })),
      catchError(error => of(UserActions.errorData({ message: error.message })))
    )))
  )

  redirectURL$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.loadData),
      tap(() => {
        this.store.select(selectUser).subscribe(user => {
          if (user) this.router.navigate(['/homelogin'])
        });
      })
    ), {dispatch : false}
  )
}
