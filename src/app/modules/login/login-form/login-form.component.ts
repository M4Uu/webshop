import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
  constructor(
    private formBuilder: FormBuilder,
  ) {}

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
    console.log(this.loginForm.value);
  }



}
