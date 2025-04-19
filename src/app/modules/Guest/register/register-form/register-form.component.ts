import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/user.action';
import { Observable } from 'rxjs';
import { selectUserMessage } from '@store/selects/user.select';
import { LoggedService } from '@core/services/loggedUser/logged.service';
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

  formBuilder = inject(FormBuilder)
  router = inject(Router)
  store = inject(Store)
  logged = inject(LoggedService)

  message$?: Observable<string | undefined>

  ngOnInit(): void {
    this.logged.ViewUserLogged()
    this.message$ = this.store.select(selectUserMessage)
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
    'pswd': ['1234', [Validators.required]],
    'confirm_password': ['1234', [Validators.required, this.passwordMatchValidator]],
    'checkbox': [true, [Validators.required, Validators.requiredTrue]]
  })

  onSubmit(){
    this.store.dispatch(UserActions.register({ payload: this.registerForm.value}))
    this.message$?.subscribe(value => {
      const msg = value?.replace(/.*:\s*/, '')
      switch (msg) {
        case 'Cannot read properties of null (reading \'status\')':
          this.router.navigate(['/'])
          console.log('User successfully registered');
          break;
        case '406 Not Acceptable':
          console.log('This user has already been registered, please create a new user or loggin');
          break;
      }
    })
    // this.store.dispatch(UserActions.protected())
  }
}
