import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ToHomeComponent } from '../../components/molecules/to-home/to-home.component';

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    RegisterFormComponent,
    ToHomeComponent
  ]
})
export class RegisterModule { }
