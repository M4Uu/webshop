import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovilService {
  private http = inject(HttpClient);
  private apiUrl = environment.api.apiUrlMovil;

  getBankList(): Observable<any> {
    return this.http.get<any>(this.apiUrl.banklist)
  }
}
