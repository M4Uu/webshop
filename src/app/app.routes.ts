import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/page/page.component';
import { RegisterComponent } from './modules/register/page/page.component';

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
    path: 'register',
    title: 'Register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
