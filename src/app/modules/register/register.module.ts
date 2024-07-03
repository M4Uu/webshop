import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './page/page.component';
import { RegisterFormComponent } from './register-form/register-form.component';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterFormComponent,
  ]
})
export class RegisterModule { }
