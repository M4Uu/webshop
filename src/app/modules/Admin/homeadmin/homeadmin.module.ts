import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { InplaceModule } from 'primeng/inplace';
import { PopoverModule } from 'primeng/popover';

const routes: Routes = [
  {
    path: '',
    title: 'Página de Inicio',
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
    ChartModule,
    TableModule,
    InplaceModule,
    PopoverModule
  ]
})
export class HomeadminModule { }
