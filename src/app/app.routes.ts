import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/features/layout/Guest/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { MainLayoutComponent as LayoutAuth } from './components/features/layout/Auth/main-layout/main-layout.component';
export const routes: Routes = [
  // Guest
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/Guest/home/home.module').then(m => m.HomeModule) },
      { path: 'contact', loadChildren: () => import('./modules/Guest/contact/contact.module').then(m => m.ContactModule) },
      { path: 'about', loadChildren: () => import('./modules/Guest/about/about.module').then(m => m.AboutModule) },
      { path: 'weoffer', loadChildren: () => import('./modules/Guest/weoffer/weoffer.module').then(m => m.WeofferModule) },
    ]
  },
  // Auth
  {
    path: 'home',
    component: LayoutAuth,
    canActivate: [authGuard],
    children: [
      { path: '',loadChildren: () => import('./modules/Auth/homelogin/homelogin.module').then(m => m.HomeloginModule) },
    ],
  },
  // Admin
  {
    path: '',
    children: []
  },
  // Global
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
