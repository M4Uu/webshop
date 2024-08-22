import { UserState } from "../core/models/user.state";
import { userReducer } from "./reducers/user.reducer";
import { selectFeatureUser } from "./selects/user.select";

export interface AppState{
  user: UserState;
}

export const userFeature = {
  name: 'user',
  reducer: userReducer,
  extraSelectors: selectFeatureUser
}
