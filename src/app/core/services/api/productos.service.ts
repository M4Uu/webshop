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

  getCatalogo(): Observable<any> {
    return this.http.get<any>(this.apiUrl.getCatalogo);
  }

  getProductosById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl.getProductosById}/${id}`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.createProducto, producto);
  }

  updateProducto(producto: any): Observable<any> {
    return this.http.put<any>(this.apiUrl.updateProducto, producto);
  }
}
