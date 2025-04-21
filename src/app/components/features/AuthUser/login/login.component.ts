import { CommonModule } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/user.action';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectUser, selectUserMessage } from '@app/store/selects/user.select';
import { UserInfo } from '@app/core/models/user.interface';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent {
  formBuilder = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);
  dialogRef = inject(MatDialogRef);
  messageService = inject(MessageService);

  private message$?: Observable< string | undefined>
  private user$?: Observable<UserInfo | undefined>

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.message$ = this.store.select(selectUserMessage);
    this.user$ = this.store.select(selectUser);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginForm = this.formBuilder.group({
    email: ['test@gmail.com', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    checkbox: [true, []]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(UserActions.login({ payload: this.loginForm.value }));
      this.message$
        ?.pipe(takeUntil(this.destroy$))
        ?.subscribe(value => {
          const msg = value?.replace(/.*:\s*/, '')
          switch (msg) {
            case 'Cannot read properties of null (reading \'status\')':
              console.log('Successful login.');
              this.store.dispatch(UserActions.protected());
              this.message$?.subscribe(value => {
                switch (msg) {
                  case 'Cannot read properties of null (reading \'status\')':
                    this.user$
                      ?.pipe(takeUntil(this.destroy$))
                      ?.subscribe(user => {
                        if (user) {
                          console.log('Successful credential verification.');
                          this.dialogRef.close(null);
                          this.router.navigate(['/home']);
                          this.destroy$.next();
                        }
                      });
                    break;
                }
              });
              this.destroy$.complete();
              break;
            case '404 (Not Found)':
              this.messageService.add({ severity: 'alert', summary: 'Alert', detail: 'Clave o Correo inválidos.', life: 3000 });
              console.log('No se reconoce los datos aportados');
              break;
            case '0 undefined':
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 });
              console.log('Error conecting with the server');
              break;
          }
        })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
