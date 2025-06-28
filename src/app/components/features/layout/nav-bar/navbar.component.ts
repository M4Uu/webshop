import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@features/AuthUser/login/login.component';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@app/core/services/auth/auth.service';
import { DialogModule } from 'primeng/dialog';
import { RegisterComponent } from '../../AuthUser/register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    ButtonModule,
    DialogModule,
    LoginComponent,
    RegisterComponent
  ]
})
export class NavbarComponent {
  @Input() user: any;

  private router = inject(Router);
  private authService = inject(AuthService)

  public menuUsers: any;
  public isMobileMenuOpen = false;
  public isUserMenuOpen = false;

  visibleLogin = false;
  visibleRegister = false;

  public navigation = [
    { name: 'Inicio', href: '/' },
    { name: '¿Quienes somos?', href: 'about' },
    { name: 'Ofrecemos', href: 'weoffer' },
    { name: 'Contacto', href: 'contact' },
  ];

  closeSesion() {
    this.authService.clearSession();
    this.router.navigate(['/'])
  }

  navigatePerfil() {
    this.router.navigateByUrl('usuarios/perfil')
  }

  navigateConfig() {
    this.router.navigateByUrl('usuarios/configuracion')
  }
}
