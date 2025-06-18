import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from 'primeng/api';
import { emailFormatValidator, nameValidator, passwordMatchValidator, strongPasswordValidator } from '../validators.form';
import { ButtonModule } from 'primeng/button';
import { UsersService } from '@app/core/services/api-users/users.service';

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
    ButtonModule
  ],
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

  ngOnInit(): void { }

  registerForm = this.formBuilder.group({
    'first_name': ['test', [
      Validators.required,
      nameValidator()
    ]],
    'last_name': ['test', [
      Validators.required,
      nameValidator()
    ]],
    'user_name': ['test', [Validators.required]],
    'email_address': ['test@gmail.com', [
      Validators.required,
      emailFormatValidator()
    ]],
    'pswd': ['123lLoo.PP', [
      Validators.required,
      // Validators.minLength(8),
    ]],
    'confirm_password': ['123lLoo.PP', [Validators.required]],
    'checkbox': [true, [Validators.required, Validators.requiredTrue]]
  }, { validator: passwordMatchValidator })


  onSubmit() {
    this.APIUsers.registerUser(this.registerForm.value).subscribe({
      next: response => {
        switch (response?.status?.statusCode) {
          case 200:
            this.messageService.add({ severity: 'contrast', summary: 'Registrado', detail: 'Usuario registrado correctamente.', life: 3000 });
            setTimeout(() => {
              this.closeDialog.emit();
            }, 3000);
            break;
          case 406:
            this.messageService.add({ severity: 'contrast', summary: 'Alerta', detail: 'Este usuario ya está registrado, por favor, cree un nuevo usuario o inicie sesión.', life: 3000 });
            break;
          case 500:
            this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Error en el servidor, por favor, solicite al servicio técnico atención para su caso o vuelva a intentarlo en un momento.', life: 3000 });
            break;
          case 0:
            this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 });
            break;
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 });
      },
    })
  }
}
