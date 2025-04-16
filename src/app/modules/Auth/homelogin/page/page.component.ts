import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../store/actions/user.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {

  store = inject(Store)
  router = inject(Router)

  onClick(){
    this.store.dispatch(UserActions.unlogin({ message: 'Sesion close succesfuly' }))
    console.log('log out.');
    this.router.navigate(['/'])
  }
}
