import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
  {
    path: 'home', // localhost:4200/
    title: 'Home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    component: HomeComponent,
  },
  {
    path: 'login', // localhost:4200/
    title: 'Login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
