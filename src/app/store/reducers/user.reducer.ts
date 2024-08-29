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
  on(UserActions.unlogin, state => ({ ...state, user: undefined })),

  // Carga de datos
  on(UserActions.loadData, (state, { payload }) => ({ ...state, user: payload })),
  on(UserActions.errorData, (state, { error }) => ({ ...state, error })),
  on(UserActions.successData, (state, { success }) => ({ ...state, success })),
)
