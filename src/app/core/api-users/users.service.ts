import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInf, UserInfo } from '../user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:1234/users'
  constructor(private http: HttpClient) {}

  loginUser(user: LoginInf) : Observable<UserInfo> {
    let params = new HttpParams()
    if(user.email && user.password){
      params = params.set('email', user.email)
      params = params.set('password', user.password)
    }
    return this.http.get<UserInfo>(this.apiUrl + "/login", { params })
  }

  registerUser(input : UserInfo) : Observable<UserInfo>{
      return this.http.post<UserInfo>(this.apiUrl + "/register", input)
  }

  uploadUser(input : UserInfo) : Observable<UserInfo>{
    return this.http.patch<UserInfo>(this.apiUrl + "/upload", input)
  }
}
