import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '@core/models/user.interface';
import { R } from '@app/global/schema/schema.response';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.apiUrlUsers;

  loginUser(user: any): Observable<R> {
    return this.http.post<R>(this.apiUrl.login, user, { withCredentials: true })
  }

  registerUser(input: any): Observable<any> {
    return this.http.post(this.apiUrl.register, input, { withCredentials: true })
  }

  uploadUser(input: any): Observable<any> {
    return this.http.patch<R>(this.apiUrl.upload, input, { withCredentials: true })
  }

  protectedUser(): Observable<{ status: any; payload: any }> {
    return this.http.get<{ status: any; payload: any }>(
      this.apiUrl.protected, { withCredentials: true }
    );
  }

  logoutUser(): Observable<any> {
    return this.http.get<UserInfo>(this.apiUrl.logout, { withCredentials: true })
  }

}
