import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.categoria;

  getCategoria(): Observable<any> {
    return this.http.get<any>(this.apiUrl.getCategorias);
  }

}
