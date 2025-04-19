import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    RegisterFormComponent,
  ]
})
export class RegisterModule { }
