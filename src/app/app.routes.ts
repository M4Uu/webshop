import { Routes } from '@angular/router';
import * as Home from './modules/home/page/page.component';
import * as Login from './modules/login/page/page.component';
import * as Register from './modules/register/page/page.component';
import * as HomeLogin from './modules/homelogin/page/page.component';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'home', // localhost:4200/
    title: 'Home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    component: Home.PageComponent,
  },
  {
    path: 'login',
    title: 'Login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    component: Login.PageComponent,
  },
  {
    path: 'register',
    title: 'Register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
    component: Register.PageComponent,
  },
  {
    path: 'homelogin',
    title: 'HomeLogin',
    loadChildren: () => import('./modules/homelogin/homelogin.module').then(m => m.HomeloginModule),
    component: HomeLogin.PageComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
