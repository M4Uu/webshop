import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';

export const routes: Routes = [
  {
    path: '',
    title: 'Catálogo de Productos',
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
    PageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RatingModule,
    FormsModule,
    DrawerModule,
    ButtonModule,
    InputTextModule,
    FloatLabel,
    MultiSelectModule,
    RouterOutlet,
    TooltipModule,
    SkeletonModule
  ]
})
export class CatalogoModule { }
