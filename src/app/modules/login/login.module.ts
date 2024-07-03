import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ToHomeComponent } from '../../components/molecules/to-home/to-home.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginFormComponent,
    ToHomeComponent,
  ]
})
export class LoginModule { }
