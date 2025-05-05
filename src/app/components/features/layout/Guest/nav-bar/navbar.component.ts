import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@features/AuthUser/login/login.component';
import { RegisterComponent } from '@features/AuthUser/register/register.component';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { UserActions } from '@app/store/actions/user.action';
import { Observable } from 'rxjs';
import { UserInfo } from '@app/core/models/user.interface';
import { selectUser } from '@app/store/selects/user.select';
import { AuthService } from '@app/core/services/auth/auth.service';

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
  store = inject(Store);
  router = inject(Router);
  authService = inject(AuthService)

  isMobileMenuOpen = false;
  isUserMenuOpen = false;

  private user$: Observable<UserInfo | undefined> = this.store.select(selectUser);
  public menuUsers:any;

  navigation = [
    { name: 'Inicio', href: '/' },
    { name: '¿Quienes somos?', href: 'about' },
    { name: 'Ofrecemos', href: 'weoffer' },
    { name: 'Contacto', href: 'contact' },
  ];

  ngOnInit(): void {
    this.user$.subscribe(u => this.menuUsers = u)
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

  closeSesion(){
    this.store.dispatch(UserActions.unlogin())
    this.authService.clearSession();
    this.router.navigate(['/'])
  }
}
