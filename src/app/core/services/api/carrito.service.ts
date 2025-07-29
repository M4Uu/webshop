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

  getCarrito(cedula: number): Observable<any> {
    const data = { cedula: cedula }
    return this.http.post<any>(this.apiUrl.getCarrito, data);
  }

  insertar(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.insertar, data);
  }

  eliminar(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.eliminar, data);
  }

  aumentarCantidad(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.aumentarCantidad, data);
  }

  disminuirCantidad(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.disminuirCantidad, data);
  }

  vendido(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.vendido, data);
  }

}
