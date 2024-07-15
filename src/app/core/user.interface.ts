export interface LoginInf {
  email: string,
  password: string,
}

export interface UserInfo {
  user_id?: string | null | undefined,
  user_name: string | null | undefined,
  email_address: string | null | undefined,
  first_name: string | null | undefined,
  last_name: string | null | undefined,
  pswd: string | null | undefined,
  created_ad?: string | null | undefined,
  checkbox?: boolean | null | undefined,
}
