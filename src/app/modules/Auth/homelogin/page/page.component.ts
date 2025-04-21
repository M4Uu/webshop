import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/user.action';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectUserMessage } from '@app/store/selects/user.select';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit{

  store = inject(Store)
  router = inject(Router)

  private message$?: Observable< string | undefined>

  ngOnInit(): void {
    this.message$ = this.store.select(selectUserMessage);
  }

  onClick(){
    this.store.dispatch(UserActions.unlogin())
    console.log('Log out');
    this.message$?.subscribe(m => m && console.log('Debug: ',m));
    this.router.navigate(['/'])
  }
}
