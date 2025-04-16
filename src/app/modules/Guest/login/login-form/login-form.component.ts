import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../../store/actions/user.action';
import { Router } from '@angular/router';
import { LoggedService } from '../../../../core/services/loggedUser/logged.service';
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

export class LoginFormComponent{
  formBuilder = inject(FormBuilder)
  store = inject(Store)
  router = inject(Router)
  logged = inject(LoggedService)

  ngOnInit(): void {
    this.logged.ViewUserLogged()
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  loginForm = this.formBuilder.group({
    email: ['test@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', Validators.required],
    checkbox: [true, [Validators.required, Validators.requiredTrue]]
  });

  @ViewChild('MyButton') ButtonRef?: ElementRef

  onSubmit() {
    this.store.dispatch(UserActions.login({ payload: this.loginForm.value }))
    this.store.dispatch(UserActions.protected())
    this.router.navigate(['/homelogin'])
  }
}
