import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "../../core/models/user.state";

export const selectUserFeature = (state: AppState) => state.user

export const selectFeatureUser = createSelector(
  selectUserFeature,
  (state: UserState) => state.user
)
