import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/user.interface';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectUser } from '../../../store/selects/user.select';
import { UserActions } from '../../../store/actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {
  store = inject(Store)
  router = inject(Router)
  ViewUserLogged() {
    console.log('Trying to catch user info...');
    this.store.dispatch(UserActions.protected());

    this.store.select(selectUser).subscribe(user => {
      if (user !== undefined) {
        console.log('Se ha ingresado correctamente.');
        this.router.navigate(['/homelogin']);
      } else {
        console.log('Debe iniciar sesión');
      }
    });
  }

}
