import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserActions } from '@app/store/actions/user.action';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly SESSION_KEY = 'session_data';
  private store = inject(Store)

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  saveSession(payload: any, status: any): void {
    const sessionData = {
      payload,
      status
    }
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    }
    this.store.dispatch(UserActions.loginSuccess({ payload: payload }));
  }

  loadSession(): void {
    let session;
    if(isPlatformBrowser(this.platformId)){
      session = localStorage.getItem(this.SESSION_KEY);
      if (session) {
        const data = JSON.parse(session);
        this.store.dispatch(UserActions.rehydrateSession({ payload: data?.payload, status: data?.status }));
      }
    }
  }

  clearSession(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
  }
}
