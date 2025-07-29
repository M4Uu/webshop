import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardadosService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.guardados;

  getGuardados(cedula: number): Observable<any> {
    const data = { cedula: cedula }
    return this.http.post<any>(this.apiUrl.getGuardados, data);
  }

  insertar(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.insertar, data);
  }

  eliminar(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.eliminar, data);
  }

}
