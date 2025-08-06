import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.productos;

  getProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl.getProductos);
  }

  getCatalogo(cedula: number): Observable<any> {
    const data = { cedula: cedula };
    return this.http.post<any>(this.apiUrl.getCatalogo, data);
  }

  getProductosById(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.getProductosById, data);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.createProducto, producto);
  }

  updateProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.updateProducto, producto);
  }

  calificacion(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.calificacion, producto);
  }

  inhabilitar(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.inhabilitar, producto);
  }
}
