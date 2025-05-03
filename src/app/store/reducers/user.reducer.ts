import { createReducer, on } from "@ngrx/store"
import { UserActions } from "../actions/user.action"
import { UserState } from "@core/models/user.state"

export const initialState: Readonly<UserState> = {
  user: undefined,
  status: undefined
}

export const userReducer = createReducer(
  initialState,

  on(UserActions.register, (state) => ({ ...state })),
  on(UserActions.login, (state) => ({ ...state })),
  on(UserActions.protected, (state) => ({ ...state })),
  on(UserActions.upload, (state) => ({ ...state })),
  on(UserActions.unlogin, () => ({ ...initialState })),

  on(UserActions.loadData, (state, { payload, status }) => ({
    ...state,
    user: payload,
    status: status
  })),
  on(UserActions.loginSuccess, (state, {payload}) => ({
    ...state,
    user: payload
  })),
  on(UserActions.rehydrateSession, (state, {payload}) => ({
    ...state,
    user: payload
  })),


  on(UserActions.messageResponse, (state, { status }) => ({
    ...state,
    status: status
  })),

  on(UserActions.clearStatus, (state) => ({
    ...state,
    status: undefined
  }
  )),
);
