import { Component, inject } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  private authService = inject(AuthService)
  public user = this.authService.loadSessionStorage();
  public editar: boolean = false;
  public editarBank: boolean = false;

  changeEditar() {
    this.editar = !this.editar;
  }

  changeEditarBank() {
    this.editarBank = !this.editarBank;
  }
}
