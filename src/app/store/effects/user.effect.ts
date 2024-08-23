import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "../../core/api-users/users.service";
import { UserActions } from "../actions/user.action";
import { catchError, first, map, mergeMap } from "rxjs";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private ApiUser: UsersService
  ){}

  register$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.register),
    first(),
    mergeMap(action => this.ApiUser.registerUser(action.payload)
    .pipe(
      map(payload => UserActions.loadData({ payload })),
      catchError(err => [UserActions.errorData({ error: err.message })])
    )))
  )
  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    first(),
    mergeMap(action => this.ApiUser.loginUser(action.payload)
    .pipe(
      map(payload => UserActions.loadData({ payload })),
      catchError(err => [UserActions.errorData({ error: err.message })])
    )))
  )
}
