import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/user.action';
import { Router } from '@angular/router';
import { LoggedService } from '@core/services/loggedUser/logged.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent{
  formBuilder = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);
  logged = inject(LoggedService);
  dialogRef = inject(MatDialogRef);

  ngOnInit(): void {
    this.logged.ViewUserLogged();
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
    checkbox: [true, []]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(UserActions.login({ payload: this.loginForm.value }));
      this.store.dispatch(UserActions.protected());
      // this.router.navigate(['/homelogin']);
      // this.dialogRef.close(this.loginForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close(this.loginForm.value);
  }
}
