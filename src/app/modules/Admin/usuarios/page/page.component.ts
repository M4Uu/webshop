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
    this.loading = true;
    this.APIuser.getUsuarios().subscribe({
      next: (response) => this.usuarios = response.data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
      complete: () => this.loading = false
    });
  }

  toggleAdmin(userIndex: any) {
    this.APIuser.toggleAdmin(this.usuarios[userIndex].cedula).subscribe({
      next: (response) => {
        if (response.data) {
          this.usuarios[userIndex].roles.splice(1, 1);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Administrador eliminado correctamente.', life: 3000 });
        } else {
          this.usuarios[userIndex].roles.push({ nombre: 'ADMINISTRADOR' });
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol de administrador añadido correctamente.', life: 3000 });
        }
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    })
  }

  toggleStatus(usuario: any) {
    this.APIuser.toggleStatus(usuario?.cedula).subscribe({
      next: (response) => {
        if (response.data) {
          usuario.estado = true;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario activado correctamente.', life: 3000 });
        } else {
          usuario.estado = false;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario desactivado correctamente.', life: 3000 });
        }
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    })
  }

  addAdmin(userIndex: any) {
  }

}
