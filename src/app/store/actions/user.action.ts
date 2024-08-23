import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginInf, UserInfo } from "../../core/models/user.interface";


export const UserActions = createActionGroup({
  source: 'User',
  events: {
    // acciones
    register: props<{ payload: UserInfo }>(),
    login: props<{ payload: LoginInf }>(),
    upload: props<{ payload: UserInfo }>(),
    unlogin: emptyProps(),

    // carga de datos
    loadData: props<{ payload: UserInfo }>(),
    errorData: props<{ error: string }>()
  }
})
