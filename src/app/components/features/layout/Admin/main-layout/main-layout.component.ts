import { Component, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { NavbarComponent } from '../../nav-bar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@app/core/services/customs/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [
    ToastModule,
    NavbarComponent,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutAdminComponent {
  public user = inject(AuthService).loadSessionStorage();
}
