import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo, LoginInf } from '../../user.interface'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:1234/users/login'
  private controller : AbortController
  constructor(private http: HttpClient) {
    this.controller = new AbortController()
   }

  LoginUser(user: LoginInf) : Observable<UserInfo> {
    let params = new HttpParams()
    if(user.email && user.password){
      params = params.set('email', user.email)
      params = params.set('password', user.password)
    }
    return this.http.get<UserInfo>(this.apiUrl, { params })
  }
}
