import { UserInfo } from "@app/core/models/user.interface"

export interface R{
  status: {
    statusCode: number,
    message: string
  }
}

export interface P{
  payload: UserInfo
  status: {
    statusCode: number,
    message: string
  }
}
