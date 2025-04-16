import { Routes } from '@angular/router';
import * as Home from './modules/Guest/home/page/page.component';
import * as About from './modules/Guest/about/page/page.component';
import * as Contact from './modules/Guest/contact/page/page.component';
import * as Members from './modules/Guest/members/page/page.component';
import * as Weoffer from './modules/Guest/weoffer/page/page.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { MainLayoutComponent } from './components/features/layout/main-layout/main-layout.component';

// import * as Login from './modules/login/page/page.component';
// import * as Register from './modules/register/page/page.component';
// import * as HomeLogin from './modules/homelogin/page/page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        title: 'Home',
        loadChildren: () => import('./modules/Guest/home/home.module').then(m => m.HomeModule),
        component: Home.PageComponent,
      },
      {
        path: 'contact',
        title: 'Contact',
        loadChildren: () => import('./modules/Guest/contact/contact.module').then(m => m.ContactModule),
        component: Contact.PageComponent,
      },
      {
        path: 'about',
        title: 'About Us',
        loadChildren: () => import('./modules/Guest/about/about.module').then(m => m.AboutModule),
        component: About.PageComponent,
      },
      {
        path: 'members',
        title: 'Members',
        loadChildren: () => import('./modules/Guest/members/members.module').then(m => m.MembersModule),
        component: Members.PageComponent,
      },
      {
        path: 'weoffer',
        title: 'We Offer',
        loadChildren: () => import('./modules/Guest/weoffer/weoffer.module').then(m => m.WeofferModule),
        component: Weoffer.PageComponent,
      },
    ]
  },
  // {
  //   path: 'login',
  //   title: 'Logi
  //   loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  //   component: Login.PageComponent,
  // },
  // {
  //   path: 'register',
  //   title: 'Register',
  //   loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
  //   component: Register.PageComponent,
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
