import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailFormatValidator, telefonoValidator } from '@app/components/features/AuthUser/validators.form';
import { MovilService } from '@app/core/services/api/movil.service';
import { UsersService } from '@app/core/services/api/users.service';
import { AuthService } from '@app/core/services/customs/auth.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit {
  private authService = inject(AuthService);
  private APIUsers = inject(UsersService);
  private APIMovil = inject(MovilService);
  private messageService = inject(MessageService);

  private fb: FormBuilder = inject(FormBuilder);

  public userForm: any;
  public movilForm = this.fb.group({
    telefono: ['', [
      Validators.required,
      telefonoValidator()
    ]],
    cedula: ['', []],
    banco_num: [, []],
  });

  public banklist: any;

  public user = this.authService.loadSessionStorage();
  public editar: boolean = false;
  public editarMovil: boolean = false;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      cedula: [this.user.cedula, [Validators.required]],
      nombres: [this.user.nombres, [Validators.required]],
      nombre_usuario: [this.user.nombre_usuario, [Validators.required]],
      localidad: [this.user.localidad, [Validators.required]],
      correo: [this.user.correo, [Validators.required, emailFormatValidator()]],
    })
    this.APIUsers.getMovil(this.user.cedula).subscribe({
      next: (responseMovil) => {
        this.APIMovil.getBankList().subscribe({
          next: (responseBank) => {
            this.banklist = responseBank.data
            this.movilForm = this.fb.group({
              telefono: [responseMovil.data.telefono, [Validators.required, telefonoValidator()]],
              cedula: [this.user.cedula, [Validators.required]],
              banco_num: [responseMovil.data.banco_num, [Validators.required]],
            })
          },
          error: (reason) => this.messageError(reason),
        })
      },
      error: (reason) => this.messageError(reason),
    })

  }
  changeEditar = () => this.editar = !this.editar;

  changeEditarMovil = () => this.editarMovil = !this.editarMovil;

  changeGuardar() {
    this.APIUsers.updateUser(this.userForm.value).subscribe({
      next: () => this.messageService.add({
        severity: 'success',
        summary: 'Datos guardados',
        detail: 'Datos guardados exitosamente. Reiniciar sesión para visualizar cambios.'
      }),
      error: (reason) => this.messageError(reason),
      complete: () => this.editar = !this.editar
    })
  }

  changeGuardarMovil() {
    this.APIUsers.updateMovil(this.movilForm.value).subscribe({
      next: () => this.messageService.add({
        severity: 'success',
        summary: 'Datos guardados',
        detail: 'Datos guardados exitosamente.'
      }),
      error: (reason) => this.messageError(reason),
      complete: () => this.editar = !this.editar
    })
    this.editarMovil = !this.editarMovil;
  }

  protected messageError = (reason: any) => {
    console.log(reason);
    this.messageService.add({
      severity: 'error',
      summary: 'Error con el servidor',
      detail: 'Error al intentar contactar con el servidor, intente más tarde.'
    })
  }
}
