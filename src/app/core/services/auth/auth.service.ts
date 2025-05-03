import { inject, Injectable } from '@angular/core';
import { UserInfo } from '@app/core/models/user.interface';
import { UserActions } from '@app/store/actions/user.action';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly SESSION_KEY = 'session_data';
  private store = inject(Store)

  saveSession(user: UserInfo): void {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    this.store.dispatch(UserActions.loginSuccess({ payload: user }));
  }

  loadSession(): boolean {
    const session = sessionStorage.getItem(this.SESSION_KEY);
    if (session) {
      const user = JSON.parse(session);
      this.store.dispatch(UserActions.rehydrateSession({ payload: user }));
      return true;
    }
    return false;
  }

  clearSession(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
  }
}
