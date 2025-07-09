import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from 'primeng/api';
import { emailFormatValidator, nameValidator, numberValidator, passwordMatchValidator } from '../validators.form';
import { ButtonModule } from 'primeng/button';
import { UsersService } from '@app/core/services/api-users/users.service';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    PasswordModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  @Output() closeDialog = new EventEmitter<void>()
  private APIUsers = inject(UsersService);

  formBuilder = inject(FormBuilder)
  router = inject(Router)
  store = inject(Store)
  messageService = inject(MessageService);

  registerForm = this.formBuilder.group({
    'cedula': ['', [
      Validators.required,
      numberValidator()
    ]],
    'nombres': ['', [
      Validators.required,
      nameValidator()
    ]],
    'nombre_usuario': ['', [
      Validators.required,
      nameValidator()
    ]],
    'localidad': ['', []],
    'credencial': ['', [Validators.required]],
    'correo': ['', [
      Validators.required,
      emailFormatValidator()
    ]],
    'imagen_url': ['', []],
    'confirm_credencial': ['', [Validators.required]],
  }, { validator: passwordMatchValidator })


  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      delete this.registerForm.value.confirm_credencial;
      this.APIUsers.registerUser(this.registerForm.value).subscribe({
        next: response => {
          switch (response?.status?.statusCode) {
            case 201:
              this.messageService.add({ severity: 'contrast', summary: 'Registrado', detail: 'Usuario registrado correctamente.', life: 3000 });
              setTimeout(() => {
                this.closeDialog.emit();
              }, 3000);
              break;
            case 0:
              this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 });
              break;
          }
        },
        error: (err) => {
          console.log(err);
          switch (err.status) {
            case 406:
              this.messageService.add({ severity: 'contrast', summary: 'Alerta', detail: 'Este usuario ya está registrado, por favor, cree un nuevo usuario o inicie sesión.', life: 3000 });
              break;
            case 500:
              this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 });
              break;
          }
        },
      })
    } else {
      this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Formulario sin contenido.', life: 3000 });
    }
  }
}
