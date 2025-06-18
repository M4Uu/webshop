import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "@core/services/api-users/users.service";
import { UserActions } from "../actions/user.action";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { R } from "@global/schema/schema.response";
import { AuthService } from "@app/core/services/auth/auth.service";

@Injectable()
export class UserEffects {
  actions$ = inject(Actions)
  ApiUser = inject(UsersService)
  store = inject(Store)
  router = inject(Router)
  authService = inject(AuthService)

  ApiError = (error: HttpErrorResponse) => {
    const backendMessage = error.error?.message;
    const fallbackMessage = error.message || 'Error desconocido';
    const finalMessage = backendMessage || fallbackMessage;
    let status: R = {
      status: {
        statusCode: error.status,
        message: finalMessage
      }
    };
    return of(UserActions.messageResponse({ status: status }))
  }

  ApiResponse = (response: R, message: string) => {
    let status: R;
    response.status ?
      status = { status: response.status }
      : status = { status: { statusCode: 200, message: `${message} sucess` } };
    if (message === 'Login')
      this.store.dispatch(UserActions.protected());
    if (message === 'Log out') this.authService.clearSession();
    return UserActions.messageResponse({ status: status });
  }

  protected$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.protected),
    mergeMap(() => this.ApiUser.protectedUser().pipe(
      tap(response => {
      }),
      map(response => {
        if (!response.payload) {
          throw new Error('Payload is undefined');
        }
        return UserActions.loadData({
          payload: response.payload,
          status: response.status
        });
      }),
      catchError((error: HttpErrorResponse) => this.ApiError(error))
    ))
  ));

  register$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.register),
    mergeMap((action: any) => this.ApiUser.registerUser(action.payload)
      .pipe(
        map((response: R) => this.ApiResponse(response, 'Register')),
        catchError((error: HttpErrorResponse) => this.ApiError(error))
      )),
  ))

  // TO DO: Es necesario cambiar el como se recibe y se manejan las reespuestas HTTP, de momento se hace por medio de Strings, pero el manejo de errores debe realizarse por sus respuestas numéricas (status: 200, 500, 401, etc.)
  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    mergeMap(action => this.ApiUser.loginUser(action.payload)
      .pipe(
        // map(response => UserActions.messageResponse({ message: response.status })),
        map((response: R) => this.ApiResponse(response, 'Login')),
        catchError((error: HttpErrorResponse) => this.ApiError(error))
      )),
  ))

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.unlogin),
    mergeMap(() => this.ApiUser.logoutUser()
      .pipe(
        map((response: R) => this.ApiResponse(response, 'Log out')),
        catchError((error: HttpErrorResponse) => this.ApiError(error))
      )),
  ))
}
