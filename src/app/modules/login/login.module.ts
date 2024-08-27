import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ToHomeComponent } from '../../components/molecules/to-home/to-home.component';

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    LoginFormComponent,
    ToHomeComponent,
  ]
})
export class LoginModule { }
