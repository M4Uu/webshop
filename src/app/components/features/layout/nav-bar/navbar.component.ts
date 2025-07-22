import { Component, inject, Injectable, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@features/AuthUser/login/login.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RegisterComponent } from '../../AuthUser/register/register.component';
import { UsersService } from '@app/core/services/api/users.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '@app/core/services/customs/auth.service';

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

export class NavbarComponent implements OnInit {
  @Input() user: any;

  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute)
  private APIUsers = inject(UsersService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);

  public menuUsers: any;
  public isMobileMenuOpen = false;
  public isUserMenuOpen = false;

  public roles: any[] = [];

  visibleLogin = false;
  visibleRegister = false;

  public navigation = [
    { name: 'Inicio', href: '/' },
    { name: '¿Quienes somos?', href: 'about' },
    { name: 'Ofrecemos', href: 'weoffer' },
    { name: 'Contacto', href: 'contact' },
  ];

  ngOnInit(): void {
    this.APIUsers.getRolesUsuario(this.user.cedula).subscribe({
      next: (response) => this.roles = response.data,
      error: (reason) => {
        console.log('Error al intentar obtener roles de usuario: ', reason);
        setTimeout(() => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar obtener roles de usuario.', life: 3000 })
        });
      }
    })
  }

  closeSesion() {
    this.authService.clearSession();
    this.APIUsers.logoutUser().subscribe({
      next: (response) => {
        if (response.statusCode = 200) {
          this.messageService.add({ severity: 'contrast', summary: 'Cierre de Sesión', detail: 'Sesión cerrada exitosamente.', life: 3000 });
        }
      },
      error: (err) => this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Error al cerrar sesión.', life: 3000 }),
      complete: () => this.router.navigate(['/'])
    });
  }

  navigatePerfil = () => this.router.navigateByUrl('usuarios/perfil');
  navigateConfig = () => this.router.navigateByUrl('usuarios/configuracion');
  navigateUsuarios = () => this.router.navigateByUrl('usuarios');
  navigateAdministrador = () => this.router.navigateByUrl('administrador');

  isAdmin() {
    let result: any;
    this.activateRoute.url.subscribe({
      next: (value) => {
        if (value[0].path === 'administrador') {
          result = false;
        } else if (this.roles) {
          result = this.roles.some(rol => rol.rol_id === 2);
        }
      }
    });
    return result;
  }

  backToUsers() {
    let result: any;
    this.activateRoute.url.subscribe((value) => result = value[0].path === 'administrador');
    return result;
  }
}
