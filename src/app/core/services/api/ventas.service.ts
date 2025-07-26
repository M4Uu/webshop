import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.ventas;

  getVentas(): Observable<any> {
    return this.http.get<any>(this.apiUrl.getVentas);
  }

  getVentasByCedula(cedula: number): Observable<any> {
    const data = { cedula: cedula };
    return this.http.post<any>(this.apiUrl.getVentasByCedula, data);
  }

}
