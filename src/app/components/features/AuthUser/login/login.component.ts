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
import { filter, firstValueFrom, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { selectUser, selectStatusResponse } from '@app/store/selects/user.select';
import { UserInfo } from '@app/core/models/user.interface';
import { R } from "@global/schema/schema.response";
import { emailFormatValidator } from '../validators.form';

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

  private status$: Observable<R | undefined> = this.store.select(selectStatusResponse);
  private user$: Observable<UserInfo | undefined> = this.store.select(selectUser);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.status$.subscribe(status => {
      if (status) {
        console.log(`[Status]\ncode: ${status?.status.statusCode}\nmessage: ${status?.status.message}`);
        switch (status.status.statusCode) {
          case 404:
            this.messageService.add({ severity: 'alert', summary: 'Alert', detail: 'Clave o Correo inválidos.', life: 3000 });
            break;
          case 500:
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor, por favor, solicite al servicio técnico atención para su caso.', life: 3000 });
            break;
          case 0:
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 });
            break;
        }
      }
      this.store.dispatch(UserActions.clearStatus());
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginForm = this.formBuilder.group({
    email: ['test@gmail.com', [
      Validators.required,
      emailFormatValidator()
    ]],
    password: ['123lLoo.PP',[
      Validators.required
    ]],
    checkbox: [true, []]
  });

  async onSubmit() {
    this.store.dispatch(UserActions.login({ payload: this.loginForm.value }));
    try {
      await firstValueFrom(
        this.status$.pipe(
          filter(s => !!s?.status?.statusCode),
          takeUntil(this.destroy$)
        )
      );

      const user = await firstValueFrom(
        this.user$.pipe(
          filter(u => !!u),
          takeUntil(this.destroy$)
        )
      )

      if (user) {
        this.dialogRef.close();
        this.router.navigate(['/home']);
        this.destroy$.complete();
      }
    } catch (e) {
      console.error('Login error:', e);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
