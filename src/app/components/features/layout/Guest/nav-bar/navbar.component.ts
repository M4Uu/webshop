import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@features/AuthUser/login/login.component';
import { RegisterComponent } from '@features/AuthUser/register/register.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule,
    ButtonModule,
  ]
})
export class NavbarComponent {
  @Input() currentPath: string = '';
  dialog = inject(MatDialog);
  router = inject(Router);
  isMobileMenuOpen = false;
  isUserMenuOpen = false;

  navigation = [
    { name: 'Inicio', href: '/' },
    { name: '¿Quienes somos?', href: 'about' },
    { name: 'Ofrecemos', href: 'weoffer' },
    // { name: 'Miembros', href: 'members' },
    { name: 'Contacto', href: 'contact' },
  ];

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('Datos del login:', result);
        // Manejo de Login
      }
    });
    this.isUserMenuOpen = false;
  }

  openRegisterModal() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('Datos del registro:', result);
        // Manejo de Registro
      }
    });
    this.isUserMenuOpen = false;
  }

  isCurrent(href: string): boolean {
    return href === this.currentPath;
  }
}
