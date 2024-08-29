import { CommonModule } from '@angular/common';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginInf, UserInfo } from '../../../core/models/user.interface';
import { Store } from '@ngrx/store';
import { selectFeatureUser } from '../../../store/selects/user.select';
import { UserActions } from '../../../store/actions/user.action';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

@Injectable({
  providedIn: 'root'
})

export class LoginFormComponent implements OnInit{
  formBuilder = inject(FormBuilder)
  store = inject(Store)
  router = inject(Router)

  user$?: Observable<UserInfo | undefined>

  ngOnInit(): void {
    this.user$ = this.store.select(selectFeatureUser)
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    checkbox: [false, [Validators.required, Validators.requiredTrue]]
  });

  onSubmit() {
    this.store.dispatch(UserActions.login({ payload: this.parseAPILog() }))
    this.store.dispatch(UserActions.protected())
    this.user$?.subscribe(value => console.log(value))
    // this.router.navigate(['/homelogin'])
  }

  parseAPILog() {
    const r: LoginInf = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    return r;
  }

}
