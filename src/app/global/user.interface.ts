export interface LoginInf {
  email: string,
  password: string,
}

export interface UserInfo {
  user_id: string,
  user_name: string,
  email_address: string,
  first_name: string,
  last_name: string,
  pswd: string,
  created_ad: string,
}

export interface RegisterInfo {
  [x: string]: any;
  user_name: string,
  email_address: string,
  first_name: string,
  last_name: string,
  pswd: string,
}
