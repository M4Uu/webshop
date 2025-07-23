import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Chip } from 'primeng/chip';
import { Skeleton } from 'primeng/skeleton';

const routes: Routes = [
  {
    path: '',
    title: 'Gestión de Usuarios',
    component: PageComponent
  }
];

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TableModule,
    Chip,
    Skeleton
  ]
})
export class UsuariosModule { }
