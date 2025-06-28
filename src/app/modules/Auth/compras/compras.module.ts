import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Historial de Compras',
    component: PageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PageComponent,
    RouterModule.forChild(routes)
  ]
})
export class ComprasModule { }
