import { Component, inject, Input, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit{
  @Input() currentPath: string = '';
  dialog = inject(MatDialog);
  router = inject(Router);
  isMobileMenuOpen = false;
  isUserMenuOpen = false;

  navigation = [
    { name: 'Inicio', href: '/' },
    { name: '¿Quienes somos?', href: 'about' },
    { name: 'Ofrecemos', href: 'weoffer' },
    { name: 'Contacto', href: 'contact' },
  ];

  ngOnInit(): void {
    // const dialogRef = this.dialog.open(LoginComponent);
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginComponent);
    // dialogRef.afterClosed().subscribe(result => {});
    this.isUserMenuOpen = false;
  }

  openRegisterModal() {
    const dialogRef = this.dialog.open(RegisterComponent);
    // dialogRef.afterClosed().subscribe(result => {});
    this.isUserMenuOpen = false;
  }

  isCurrent(href: string): boolean {
    return href === this.currentPath;
  }
}
