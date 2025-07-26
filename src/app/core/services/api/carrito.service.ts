import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.carrito;

  getCategoria(cedula: number): Observable<any> {
    const data = { cedula: cedula }
    return this.http.post<any>(this.apiUrl.getCarrito, data);
  }

}
