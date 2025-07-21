import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
export const routes: Routes = [
  // Guest
  {
    path: '',
    loadComponent: () => import('./components/features/layout/Guest/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    children: [
      { path: '', loadChildren: () => import('./modules/Guest/home/home.module').then(m => m.HomeModule) },
      { path: 'contact', loadChildren: () => import('./modules/Guest/contact/contact.module').then(m => m.ContactModule) },
      { path: 'about', loadChildren: () => import('./modules/Guest/about/about.module').then(m => m.AboutModule) },
      { path: 'weoffer', loadChildren: () => import('./modules/Guest/weoffer/weoffer.module').then(m => m.WeofferModule) },
    ]
  },
  // Auth
  {
    path: 'usuarios',
    loadComponent: () => import('./components/features/layout/Auth/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', loadChildren: () => import('./modules/Auth/homelogin/homelogin.module').then(m => m.HomeloginModule) },
      { path: 'catalogo', loadChildren: () => import('./modules/Auth/catalogo/catalogo.module').then(m => m.CatalogoModule) },
      { path: 'carrito', loadChildren: () => import('./modules/Auth/carrito/carrito.module').then(m => m.CarritoModule) },
      { path: 'compras', loadChildren: () => import('./modules/Auth/compras/compras.module').then(m => m.ComprasModule) },
      { path: 'guardados', loadChildren: () => import('./modules/Auth/guardados/guardados.module').then(m => m.GuardadosModule) },
      { path: 'pedidos', loadChildren: () => import('./modules/Auth/pedidos/pedidos.module').then(m => m.PedidosModule) },
      { path: 'perfil', loadChildren: () => import('./modules/Auth/perfil/perfil.module').then(m => m.PerfilModule) },
      { path: 'configuracion', loadChildren: () => import('./modules/Auth/configuracion/configuracion.module').then(m => m.ConfiguracionModule) },
    ],
  },
  // Admin
  {
    path: 'administrador',
    loadComponent: () => import('./components/features/layout/Admin/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    children: [
      { path: '', loadChildren: () => import('./modules/Admin/homeadmin/homeadmin.module').then(m => m.HomeadminModule) },
      { path: 'usuarios', loadChildren: () => import('./modules/Admin/usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'productos', loadChildren: () => import('./modules/Admin/productos/productos.module').then(m => m.ProductosModule) },
      { path: 'pedidos', loadChildren: () => import('./modules/Admin/pedidos/pedidos.module').then(m => m.PedidosModule) },
      { path: 'ventas', loadChildren: () => import('./modules/Admin/ventas/ventas.module').then(m => m.VentasModule) },
    ]
  },
  // Global
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
