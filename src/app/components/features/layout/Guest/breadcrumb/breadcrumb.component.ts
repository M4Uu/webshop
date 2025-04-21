import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})

export class BreadcrumbComponent {
  public visible: boolean = false;
  public home: MenuItem | undefined;
  public title: string = '';
  public items: MenuItem[] | undefined;
  private excludedRoutes = /^\/(home|inicio)?$/;

  constructor(
    private router: Router,
  ) {
    this.home = { icon: 'pi pi-home', routerLink: '/' };


    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects
        this.visible = !this.excludedRoutes.test(url);
        this.items = [
          { label: url.split('/').join('') }
        ]

        switch (url) {
          case '/about':
            this.title = '¿QUIENES SOMOS?';
            break;
          case '/weoffer':
            this.title = 'OFRECEMOS';
            break;
          case '/members':
            this.title = 'MIEMBROS';
            break;
          case '/contact':
            this.title = 'CONTACTO';
            break;
        }
        // console.log('Breadcrumb visible:', this.visible, 'for URL:', url);
      });
  }
}
