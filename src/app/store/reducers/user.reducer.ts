import { ActionReducer, MetaReducer } from '@ngrx/store';
import { createReducer, on } from "@ngrx/store"
import { UserActions } from "../actions/user.action"
import { UserState } from "../../core/models/user.state"

export const initalState: Readonly<UserState> = {}

export const userReducer = createReducer(
  initalState,
  // Acciones
  on(UserActions.register, state => ({ ...state })),
  on(UserActions.login, state => ({ ...state })),
  on(UserActions.protected, state => ({ ...state })),
  on(UserActions.upload, state => ({ ...state })),
  on(UserActions.unlogin, state => ({ ...state })),

  // Carga de datos
  on(UserActions.loadData, (state, { payload }) => ({ ...state, user: payload })),
  on(UserActions.errorData, (state, { message }) => ({ ...state, message })),
  on(UserActions.successData, (state, { message }) => ({ ...state, message })),
)

export function resetStateMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) =>
      {
        if (action.type === UserActions.unlogin.type) {
            return undefined
        }
        return reducer(state, action)
      }
}

export const metaReducers: MetaReducer<any>[] =
[
  resetStateMetaReducer,
];
