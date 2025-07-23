import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { R } from '@app/global/schema/schema.response';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.apiUrlUsers;

  // Viajan con cookies
  loginUser(user: any): Observable<R> {
    return this.http.post<R>(this.apiUrl.login, user, { withCredentials: true })
  }

  protectedUser(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl.protected, { withCredentials: true }
    );
  }

  logoutUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl.logout, { withCredentials: true })
  }

  // Viajan sin cookies
  getMovil(cedula: any): Observable<any> {
    const data = { cedula: cedula };
    return this.http.post<any>(this.apiUrl.getmovil, data, { withCredentials: false })
  }

  updateMovil(user: any): Observable<any> {
    return this.http.patch<any>(this.apiUrl.updatemovil, user, { withCredentials: false })
  }

  registerUser(input: any): Observable<any> {
    return this.http.post(this.apiUrl.register, input, { withCredentials: false })
  }

  updateUser(input: any): Observable<any> {
    return this.http.patch<any>(this.apiUrl.update, input, { withCredentials: false })
  }

  getRolesUsuario(cedula: any) {
    const data = { cedula: cedula };
    return this.http.post<any>(this.apiUrl.getRolesUsuario, data, { withCredentials: false });
  }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl.getUsuarios, { withCredentials: false });
  }
}
