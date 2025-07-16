import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

const routes: Routes = [
  {
    path: '',
    title: 'Perfil de Usuario',
    component: PageComponent
  }
];

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    SelectModule
  ]
})
export class PerfilModule { }
