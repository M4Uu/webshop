import { ActionReducer } from '@ngrx/store';
import { UserActions } from "../actions/user.action"

export function resetStateMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) =>
    {
      // console.log('Action dispatch:', action.type);
      if (action.type === UserActions.unlogin.type){
          state = undefined;
        }
      return reducer(state, action)
    }
}
