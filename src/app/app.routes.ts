import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
  {
    path: 'home', // localhost:4200/
    title: 'Home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
