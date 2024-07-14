import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterInfo, UserInfo } from '../../user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:1234/users/register'
  constructor(private http: HttpClient) { }

  registerUser(input : RegisterInfo) : Observable<UserInfo>{
    return this.http.post<UserInfo>(this.apiUrl,  input)
  }
}
