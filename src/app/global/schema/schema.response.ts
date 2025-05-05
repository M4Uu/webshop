import { SessionInfo, UserInfo } from "@app/core/models/user.interface"

export interface R{
  status: {
    statusCode: number,
    message: string
  }
}

export interface E{
  payload: UserInfo
  status: {
    statusCode: number,
    message: string
  }
}
