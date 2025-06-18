import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../nav-bar/navbar.component';
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    BreadcrumbComponent,
    ToastModule
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent{

}
