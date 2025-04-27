import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "@core/models/user.state";

export const selectUserState = (state: AppState) => state.user

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
)

export const selectStatusResponse = createSelector(
  selectUserState,
  (state: UserState) => state.status
);
