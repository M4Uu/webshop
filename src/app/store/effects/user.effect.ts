import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "@core/services/api-users/users.service";
import { UserActions } from "../actions/user.action";
import { catchError, delay, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

@Injectable()
export class UserEffects {
  actions$ = inject(Actions)
  ApiUser = inject(UsersService)
  store = inject(Store)
  router = inject(Router)

  ApiError = (error: HttpErrorResponse) => {
    const backendMessage = error.error?.message;
    const fallbackMessage = error.message || 'Error desconocido';
    const finalMessage = backendMessage || fallbackMessage;
    return of(UserActions.messageResponse({ message: finalMessage }))
  }

  protected$ = createEffect(() => this.actions$.pipe(
    delay(1000),
    ofType(UserActions.protected),
    mergeMap(() => this.ApiUser.protectedUser()
    .pipe(
      map(payload => UserActions.loadData({ payload })),
      catchError((error: HttpErrorResponse) => this.ApiError(error))
    )))
  )

  register$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.register),
    mergeMap((action: any) => this.ApiUser.registerUser(action.payload)
    .pipe(
      map(response => UserActions.messageResponse({ message: response.status })),
      catchError((error: HttpErrorResponse) => this.ApiError(error))
    )),
  ))

  // TO DO: Es necesario cambiar el como se recibe y se manejan las reespuestas HTTP, de momento se hace por medio de Strings, pero el manejo de errores debe realizarse por sus respuestas numéricas (status: 200, 500, 401, etc.)
  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    mergeMap(action => this.ApiUser.loginUser(action.payload)
    .pipe(
      map(response => UserActions.messageResponse({ message: response.status })),
      // map((response: HttpResponse<any>) => UserActions.messageResponse({ message: response.status })),
      catchError((error: HttpErrorResponse) => this.ApiError(error))
    )),
  ))

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.unlogin),
    mergeMap(() => this.ApiUser.logoutUser()
    .pipe(
      map(response => UserActions.messageResponse({ message: response.status })),
      catchError((error: HttpErrorResponse) => this.ApiError(error))
    )),
  ))
}
