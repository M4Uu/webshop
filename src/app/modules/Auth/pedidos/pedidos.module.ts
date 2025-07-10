import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DrawerModule } from 'primeng/drawer';
import { FormPedidosComponent } from '@app/components/features/pedidos/form-pedidos/form-pedidos.component';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
  {
    path: '',
    title: 'Pedidos',
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
    ButtonModule,
    TableModule,
    DrawerModule,
    FormPedidosComponent,
    InputTextModule
  ]
})
export class PedidosModule { }
