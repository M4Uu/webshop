import { MetaReducer } from "@ngrx/store";
import { UserState } from "../core/models/user.state";
import { resetStateMetaReducer } from "./meta-reducers/user.meta-reducer";
import { userReducer } from "./reducers/user.reducer";
import { selectUser } from "./selects/user.select";

export interface AppState{
  user: UserState;
}

export const userFeature = {
  name: 'user',
  reducer: userReducer,
  extraSelectors: selectUser
}

export const metaReducers: MetaReducer<any>[] =
[
  resetStateMetaReducer,
];
