import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '@app/core/services/api/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: false
})
export class PageComponent implements OnInit {
  private APIuser = inject(UsersService);
  public messageService = inject(MessageService);
  public usuarios: any[] = [];
  public loading: boolean = false

  ngOnInit() {
    this.APIuser.getUsuarios().subscribe({
      next: (response) => this.usuarios = response.data,
      error: () => this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
      complete: () => this.loading = true
    });
  }

  removeAdmin(userIndex: any) {
    this.usuarios[userIndex].roles.splice(1, 1);
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Administrador eliminado correctamente.', life: 3000 });
  }

  addAdmin(userIndex: any) {
    this.usuarios[userIndex].roles.push({ nombre: 'ADMINISTRADOR' });
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol de administrador añadido correctamente.', life: 3000 });
  }

}
