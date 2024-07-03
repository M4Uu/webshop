import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  constructor(private formBuilder: FormBuilder){}

  registerForm = this.formBuilder.group({
    'name': ['', [Validators.required]],
    'last-name': ['', [Validators.required]],
    'user-name': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required]],
    'confirm-password': ['', [Validators.required]],
  })

  onSubmit(){
    console.log(this.registerForm.value);
  }
}
