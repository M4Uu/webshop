import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';

export const routes: Routes = [
  {
    path: '',
    title: 'Elementos Guardados',
    component: PageComponent,
    children: [
      {
        path: 'producto/:id',
        loadComponent: () => import('@features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
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
    DrawerModule,
    RatingModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
    FloatLabelModule,
  ]
})
export class GuardadosModule { }
