import { Component, inject } from '@angular/core';
import { LoggedService } from '../../../../core/services/loggedUser/logged.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent{
    router = inject(Router)
    logged = inject(LoggedService)

    ngOnInit() {
      this.logged.ViewUserLogged()
    }

    // Apertura de modales o navegación
    navigateRegister() {
      this.router.navigate(['/register'])
    }
    navigateLogin() {
      this.router.navigate(['/login'])
    }
}
