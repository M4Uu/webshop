import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../../user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:1234/users/upload'
  constructor(private http: HttpClient) { }

  uploadUser(input : UserInfo) : Observable<UserInfo>{
    return this.http.patch<UserInfo>(this.apiUrl,  input)
  }
}
