import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { R } from '@app/global/schema/schema.response';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';

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
    inject(AuthService).clearSession();
    inject(CookieService).deleteAll();
    return this.http.get<any>(this.apiUrl.logout, { withCredentials: true })
  }

}
