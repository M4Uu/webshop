import { Component, Inject, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
export class NavbarComponent implements OnInit {
  @Input() user: any;

  private router = inject(Router);
  private authService = inject(AuthService)

  public menuUsers: any;
  public isMobileMenuOpen = false;
  public isUserMenuOpen = false;

  visibleLogin: boolean = false;
  visibleRegister: boolean = false;

  public navigation = [
    { name: 'Inicio', href: '/' },
    { name: '¿Quienes somos?', href: 'about' },
    { name: 'Ofrecemos', href: 'weoffer' },
    { name: 'Contacto', href: 'contact' },
  ];

  ngOnInit(): void { }

  closeSesion() {
    this.authService.clearSession();
    this.router.navigate(['/'])
  }
}
