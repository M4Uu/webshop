import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
  {
    path: '',
    title: 'Pedidos',
    component: PageComponent,
    children: [
      {
        path: 'detalle/:id',
        loadComponent: () => import('@app/components/features/pedidos/form-pedidos/form-pedidos.component').then(m => m.FormPedidosComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    TableModule,
    DrawerModule,
    InputTextModule,
    RouterOutlet,
  ]
})
export class PedidosModule { }
