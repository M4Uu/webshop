import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home', // localhost:4200/
    title: 'Home',
    loadComponent: () => import('./modules/home/pages/home/home.component').then(m => m.HomeComponent),
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
