import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "../../core/api-users/users.service";
import { UserActions } from "../actions/user.action";
import { catchError, delay, first, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserEffects {
  actions$ = inject(Actions)
  ApiUser = inject(UsersService)

  register$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.register),
    mergeMap(action => this.ApiUser.registerUser(action.payload)
    .pipe(
      map(() => UserActions.successData({ success: 'User logged succesfully' })),
      catchError(error => of(UserActions.errorData({ error: error.message })))
    )),
    catchError(error => of(UserActions.errorData({ error: error.message })))
  ))

  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    mergeMap(action => this.ApiUser.loginUser(action.payload)
    .pipe(
      map(() => UserActions.successData({ success: 'User logged succesfully' })),
      catchError(error => of(UserActions.errorData({ error: error.message })))
    )),
    catchError(error => of(UserActions.errorData({ error: error.message })))
  ))

  protected$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.protected),
    delay(1000),
    mergeMap(() => this.ApiUser.protectedUser()
    .pipe(
      map(payload => UserActions.loadData({ payload })),
      catchError(error => of(UserActions.errorData({ error: error.message })))
    )))
  )
}
