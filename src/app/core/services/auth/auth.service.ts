import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UsersService } from '../api-users/users.service';
import { catchError, map, Observable, of, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly SESSION_KEY = 'session_data';
  private APIUser = inject(UsersService);
  private platformId = inject(PLATFORM_ID) as object;

  saveSession(payload: any): void {
    const sessionData = payload
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    }
  }

  loadSessionStorage(): any {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem(this.SESSION_KEY);
      if (user) {
        return JSON.parse(user);
      } else {
        return null;
      }
    }
  }

  loadSessionProtected(): Observable<boolean> {
    return this.APIUser.protectedUser().pipe(
      map(response => {
        if (response.payload) {
          this.saveSession(response.payload);
          return true;
        }
        return false;
      }),
      catchError(() => of(false)),
      take(1)
    );
  }

  clearSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.SESSION_KEY);
    }
  }
}
