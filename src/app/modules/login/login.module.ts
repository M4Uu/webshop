import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/page.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginFormComponent,
  ]
})
export class LoginModule { }
