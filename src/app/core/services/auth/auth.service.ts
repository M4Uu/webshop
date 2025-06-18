import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UsersService } from '../api-users/users.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly SESSION_KEY = 'session_data';
  private APIUser = inject(UsersService);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  saveSession(payload: any): void {
    const sessionData = payload
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    }
  }

  loadSessionStorage(): any {
    if(isPlatformBrowser(this.platformId)){
      const user = localStorage.getItem(this.SESSION_KEY);
      if(user){
        return JSON.parse(user);
      }else{
        return false;
      }
    }
  }

  loadSessionProtected(): Observable<boolean> { // Indicamos que devuelve un Observable<boolean>
    return this.APIUser.protectedUser().pipe(
      map(response => {
        console.log('RESPUESTA')
        if (response.payload) {
          this.saveSession(response.payload);
          return true;
        } else {
          console.log(`${response.status.statusCode} - ${response.status.message}`);
          return false;
        }
      }),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  clearSession(): void {
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem(this.SESSION_KEY);
    }
  }
}
