import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Injectable, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from 'primeng/api';
import { emailFormatValidator } from '../validators.form';
import { ButtonModule } from 'primeng/button';
import { UsersService } from '@app/core/services/api-users/users.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent {
  @Output() closeDialog = new EventEmitter<void>()

  private APIUser = inject(UsersService);
  formBuilder = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);
  messageService = inject(MessageService);

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginForm = this.formBuilder.group({
    correo: ['', [
      Validators.required,
      emailFormatValidator()
    ]],
    password: ['', [
      Validators.required
    ]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'contrast', summary: 'Formulario vacío', detail: 'Debe rellenar los datos.', life: 3000 });
      return;
    }
    this.APIUser.loginUser(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['usuarios']),
      error: (err) => {
        switch (err.status) {
          case 401:
            this.messageService.add({ severity: 'contrast', summary: 'Alert', detail: 'Clave o Correo inválidos.', life: 3000 });
            break;
          case 500:
            this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Error en el servidor, por favor, solicite al servicio técnico atención para su caso.', life: 3000 });
            break;
          case 0:
            this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 });
            break;
        }
      }
    })
  }


}
