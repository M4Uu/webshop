import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, inject, Injectable, Output, PLATFORM_ID } from '@angular/core';
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
    ButtonModule
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

  ngOnInit(): void { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginForm = this.formBuilder.group({
    email: ['cruzmlathulerie@gmail.com', [
      Validators.required,
      emailFormatValidator()
    ]],
    password: ['1234', [
      Validators.required
    ]],
    checkbox: [true, []]
  });

  onSubmit() {
    this.APIUser.loginUser(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.status) {
          const status = response.status;
          switch (status?.statusCode) {
            case 200:
              this.router.navigate(['home']);
              break;
            case 404:
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
      },
      error: (err) => console.log(err)
    })
    // this.store.dispatch(UserActions.login({ payload: this.loginForm.value }));
  }


}
