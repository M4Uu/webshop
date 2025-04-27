import { R } from "@app/global/schema/schema.response";
import { UserInfo } from "./user.interface";

export interface UserState {
  user?: UserInfo,
  status?: R,
}
