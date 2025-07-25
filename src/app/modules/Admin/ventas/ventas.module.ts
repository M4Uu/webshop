import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  {
    path: '',
    title: 'Historial de Ventas',
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
    TableModule
  ]
})
export class VentasModule { }
