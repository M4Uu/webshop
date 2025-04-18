import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../AuthUser/login/login.component';
import { RegisterComponent } from '../../AuthUser/register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule
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
        console.log('Datos del login:', result);
        // Aquí puedes manejar el login
      }
    });
    this.isUserMenuOpen = false;
    // this.router.navigate(['/login']);
  }

  openRegisterModal() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos del registro:', result);
        // Manejo de Login
      }
    });
    this.isUserMenuOpen = false;
    // this.router.navigate(['/register']);
  }

  isCurrent(href: string): boolean {
    return href === this.currentPath;
  }
}
