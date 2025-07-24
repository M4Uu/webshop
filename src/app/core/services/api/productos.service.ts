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

  getProductosById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl.getProductosById}/${id}`);
  }
}
