import { Component, inject, Injectable, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@features/AuthUser/login/login.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RegisterComponent } from '../../AuthUser/register/register.component';
import { UsersService } from '@app/core/services/api-users/users.service';
import { MessageService } from 'primeng/api';

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

@Injectable({
  providedIn: 'root'
})

export class NavbarComponent {
  @Input() user: any;

  private router = inject(Router);
  private APIUsers = inject(UsersService);
  private messageService = inject(MessageService);

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
    this.APIUsers.logoutUser().subscribe({
      next: (response) => {
        if (response.statusCode = 200) {
          this.messageService.add({ severity: 'contrast', summary: 'Formulario vacío', detail: 'Sesión cerrada exitosamente.', life: 3000 });
        }
      },
      error: (err) => console.error('Error al cerrar sesión:', err),
      complete: () => this.router.navigate(['/'])
    });
  }

  navigatePerfil() {
    this.router.navigateByUrl('usuarios/perfil')
  }

  navigateConfig() {
    this.router.navigateByUrl('usuarios/configuracion')
  }
}
