import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';

const routes: Routes = [
  {
    path: '',
    title: 'Lista de Pedidos',
    component: PageComponent,
    children: [
      {
        path: 'detalle/:id',
        loadComponent: () => import('@app/components/features/products/form-productos/form-productos.component').then(m => m.FormProductosComponent),
      },
    ],
  }
];

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ButtonModule,
    TableModule,
    DrawerModule,
    InputTextModule,
    RouterOutlet,
    RatingModule,
    FormsModule,
    FileUpload
  ]
})
export class PedidosModule { }
