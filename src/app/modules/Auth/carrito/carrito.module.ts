import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TooltipModule } from 'primeng/tooltip';
import { PasarelaPagoComponent } from '@app/components/features/products/pasarela-pago/pasarela-pago.component';

const routes: Routes = [
  {
    path: '',
    title: 'Carrito de Compras',
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
    TableModule,
    ButtonModule,
    DrawerModule,
    PasarelaPagoComponent
  ]
})
export class CarritoModule { }
