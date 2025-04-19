import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/features/layout/main-layout/main-layout.component';

// import * as Login from './modules/Guest/login/page/page.component';
// import * as Register from './modules/Guest/register/page/page.component';
// import * as HomeLogin from './modules/homelogin/page/page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/Guest/home/home.module').then(m => m.HomeModule) },
      { path: 'contact', loadChildren: () => import('./modules/Guest/contact/contact.module').then(m => m.ContactModule) },
      { path: 'about', loadChildren: () => import('./modules/Guest/about/about.module').then(m => m.AboutModule) },
      { path: 'weoffer', loadChildren: () => import('./modules/Guest/weoffer/weoffer.module').then(m => m.WeofferModule) },
      // { path: 'members', loadChildren: () => import('./modules/Guest/members/members.module').then(m => m.MembersModule) },
    ]
  },
  // {
  //   path: 'register',
  //   title: 'Register',
  //   loadChildren: () => import('./modules/Guest/register/register.module').then(m => m.RegisterModule),
  //   component: Register.PageComponent,
  // },
  // {
  //   path: 'login',
  //   title: 'Login',
  //   loadChildren: () => import('./modules/Guest/login/login.module').then(m => m.LoginModule),
  //   component: Login.PageComponent,
  // },
  // {
  //   path: 'homelogin',
  //   title: 'HomeLogin',
  //   loadChildren: () => import('./modules/homelogin/homelogin.module').then(m => m.HomeloginModule),
  //   component: HomeLogin.PageComponent,
  //   // canActivate: [authGuard]
  // },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
