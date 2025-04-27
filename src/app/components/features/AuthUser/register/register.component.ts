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

  status$?: Observable<R | undefined>

  ngOnInit(): void {
    this.status$ = this.store.select(selectStatusResponse)
  }

  passwordMatchValidator(group: FormGroup){
    const password = group.get('pswd')?.value
    const confirmPassword = group.get('confirm-password')?.value
    return password === confirmPassword ? null : { mismatch: true }
  }

  registerForm = this.formBuilder.group({
    'first_name': ['test', [Validators.required]],
    'last_name': ['test', [Validators.required]],
    'user_name': ['test', [Validators.required]],
    'email_address': ['test@gmail.com', [Validators.required, Validators.email]],
    'pswd': ['123', [Validators.required]],
    'confirm_password': ['123', [Validators.required, this.passwordMatchValidator]],
    'checkbox': [true, [Validators.required, Validators.requiredTrue]]
  })

  closeDialog() {
    this.dialogRef.close(null);
  }


  onSubmit(){
    this.store.dispatch(UserActions.register({ payload: this.registerForm.value}))
    this.status$?.subscribe(value => {
      switch (value?.status.statusCode) {
        case 200:
          this.router.navigate(['/'])
          console.log('User successfully registered');
          this.messageService.add({ severity: 'success', summary: 'Registrado', detail: 'Usuario registrado correctamente.', life: 3000 });
          this.dialogRef.close(this.registerForm.value);
          break;
        case 406:
          this.messageService.add({ severity: 'alert', summary: 'Alert', detail: 'Este usuario ya está registrado, por favor, cree un nuevo usuario o inicie sesión.', life: 3000 });
          console.log('This user has already been registered, please create a new user or loggin');
          break;
        case 500:
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 });
          console.log('Error conecting with the server');
          break;
      }
    })
  }
}
