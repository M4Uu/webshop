import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { FacturaComponent } from '@app/components/shared/factura/factura.component';


export const routes: Routes = [
  {
    path: '',
    title: 'Historial de Compras',
    component: PageComponent,
    children: [
      {
        path: 'producto/:id',
        loadComponent: () => import('@features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
      },
    ]
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
    TableModule,
    ButtonModule,
    DrawerModule,
    RouterOutlet,
    FacturaComponent
  ]
})
export class ComprasModule { }
