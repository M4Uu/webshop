import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.pedidos;

  get(): Observable<any> {
    return this.http.get<any>(this.apiUrl.getPedidos);
  }

  getByCedula(cedula: number): Observable<any> {
    const data = { cedula: cedula };
    return this.http.post<any>(this.apiUrl.getByCedula, data);
  }

  getById(id: number): Observable<any> {
    const data = { pedido_id: id };
    return this.http.post<any>(this.apiUrl.getById, data);
  }

  getPrioridad(): Observable<any> {
    return this.http.get<any>(this.apiUrl.getPrioridad);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.create, data);
  }

  update(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.update, data);
  }

  updateAdmin(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.updateAdmin, data);
  }

  delete(id: number): Observable<any> {
    const data = { pedido_id: id };
    return this.http.post<any>(this.apiUrl.delete, data);
  }
}
