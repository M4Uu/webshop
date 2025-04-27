import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInf, UserInfo } from '../../models/user.interface';
import { P, R } from '@app/global/schema/schema.response';
// import { API_KEY } from '../../env/config'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:1234/users'
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

  protectedUser(): Observable<HttpResponse<P>> {
    // const params = new HttpParams().set('type', input)
    return this.http.get<P>(this.apiUrl + "/protected", { withCredentials: true, observe: 'response' })
  }

  logoutUser(): Observable<any> {
    return this.http.get<UserInfo>(this.apiUrl + "/logout", { withCredentials: true })
  }

}
