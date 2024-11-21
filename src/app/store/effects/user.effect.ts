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
      map(response => UserActions.messageResponse({ message: response.status })),
      catchError(error => of(UserActions.messageResponse({ message: error.message })))
    )),
  ))

  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    mergeMap(action => this.ApiUser.loginUser(action.payload)
    .pipe(
      map(response => UserActions.messageResponse({ message: response.status })),
      catchError(error => of(UserActions.messageResponse({ message: error.message })))
    )),
  ))

  protected$ = createEffect(() => this.actions$.pipe(
    delay(1000),
    ofType(UserActions.protected),
    mergeMap(() => this.ApiUser.protectedUser()
    .pipe(
      map(payload => UserActions.loadData({ payload })),
      catchError(error => of(UserActions.unlogin({ message: error.message })))
    )))
  )
}
