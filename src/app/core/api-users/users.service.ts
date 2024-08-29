import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInf, UserInfo } from '../models/user.interface';
// import { API_KEY } from '../../env/config'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:1234/users'
  constructor(private http: HttpClient) {}

  loginUser(user: LoginInf) : Observable<any> {
    return this.http.post(this.apiUrl + "/login", user, { withCredentials: true })
  }

  registerUser(input : UserInfo) : Observable<any> {
    return this.http.post(this.apiUrl + "/register", input, { withCredentials: true })
  }

  uploadUser(input : UserInfo) : Observable<any> {
    return this.http.patch<UserInfo>(this.apiUrl + "/upload", input, { withCredentials: true })
  }

  protectedUser() : Observable<UserInfo>{
    return this.http.get<UserInfo>(this.apiUrl + "/protected", { withCredentials: true })
  }
}
