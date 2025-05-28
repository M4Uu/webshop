import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInf, SessionInfo, UserInfo } from '../../models/user.interface';
import { R } from '@app/global/schema/schema.response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:1234/api' + '/users';
  // private apiUrl = 'https://webshop-backend-i8ee.onrender.com/api' + '/users';
  constructor(private http: HttpClient) { }

  loginUser(user: LoginInf): Observable<HttpResponse<R>> {
    return this.http.post<HttpResponse<R>>(this.apiUrl + "/login", user, { withCredentials: true })
  }

  registerUser(input: UserInfo): Observable<any> {
    return this.http.post(this.apiUrl + "/register", input, { withCredentials: true })
  }

  uploadUser(input: UserInfo): Observable<any> {
    return this.http.patch<R>(this.apiUrl + "/upload", input, { withCredentials: true })
  }

  protectedUser(): Observable<{ status: any; payload: SessionInfo }> {
    return this.http.get<{ status: any; payload: SessionInfo }>(
      this.apiUrl + "/protected",
      { withCredentials: true }
    );
  }

  logoutUser(): Observable<any> {
    return this.http.get<UserInfo>(this.apiUrl + "/logout", { withCredentials: true })
  }

}
