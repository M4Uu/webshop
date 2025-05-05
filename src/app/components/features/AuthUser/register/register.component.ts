import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/user.action';
import { Observable } from 'rxjs';
import { selectStatusResponse } from '@store/selects/user.select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { R } from '@app/global/schema/schema.response';
import { emailFormatValidator, nameValidator, passwordMatchValidator, strongPasswordValidator } from '../validators.form';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  formBuilder = inject(FormBuilder)
  router = inject(Router)
  store = inject(Store)
  dialogRef = inject(MatDialogRef);
  messageService = inject(MessageService);
  status$?: Observable<R | undefined> = this.store.select(selectStatusResponse);

  ngOnInit(): void {
    this.status$?.subscribe(status => {
      status && console.log(`[Status]\ncode: ${status?.status?.statusCode}\nmessage: ${status?.status?.message}`);
    })
  }

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

  closeDialog() {
    this.dialogRef.close(null);
  }


  onSubmit(){
    this.store.dispatch(UserActions.register({ payload: this.registerForm.value}))
    this.status$?.subscribe(value => {
      switch (value?.status?.statusCode) {
        case 200:
          this.messageService.add({ severity: 'success', summary: 'Registrado', detail: 'Usuario registrado correctamente.', life: 3000 });
          this.dialogRef.close();
          break;
        case 406:
          this.messageService.add({ severity: 'alert', summary: 'Alert', detail: 'Este usuario ya está registrado, por favor, cree un nuevo usuario o inicie sesión.', life: 3000 });
          break;
        case 500:
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor, por favor, solicite al servicio técnico atención para su caso o vuelva a intentarlo en un momento.', life: 3000 });
          break;
        case 0:
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 });
          break;
      }
    })
  }
}
