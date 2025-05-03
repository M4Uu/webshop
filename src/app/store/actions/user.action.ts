import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginInf, UserInfo } from "../../core/models/user.interface";
import { R } from "@global/schema/schema.response";

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    // acciones
    register: props<{ payload: UserInfo }>(),
    upload: props<{ payload: UserInfo }>(),
    login: props<{ payload: LoginInf }>(),
    unlogin: emptyProps(),
    clearStatus: emptyProps(),

    // Session
    protected: emptyProps(),
    loginSuccess: props<{ payload: UserInfo }>(),
    rehydrateSession: props<{ payload: UserInfo }>(),

    // carga de datos
    loadData: props<{ payload: UserInfo, status: R }>(),
    messageResponse: props<{ status: R }>()
  }
})
