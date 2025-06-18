import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from '../../nav-bar/navbar.component';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    NavbarComponent,
    ToastModule
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private authService = inject(AuthService)
  public user = this.authService.loadSessionStorage();
}
