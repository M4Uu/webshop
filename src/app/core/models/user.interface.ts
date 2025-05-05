export interface LoginInf {
  email?: string | null,
  password?: string | null,
}

export interface UserInfo {
  user_name?: string | null,
  pswd?: string | null,
  email_address?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  created_ad?: string | null,
  checkbox?: boolean | null,
}

export interface SessionInfo {
  user_name?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  created_ad?: string | null,
}
