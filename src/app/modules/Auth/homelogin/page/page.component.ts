import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/user.action';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectStatusResponse } from '@app/store/selects/user.select';
import { R } from '@app/global/schema/schema.response';

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

  private status$?: Observable<R | undefined>

  ngOnInit(): void {
    this.status$ = this.store.select(selectStatusResponse);
  }

  onClick(){
    this.store.dispatch(UserActions.unlogin())
    this.router.navigate(['/'])
  }
}
