import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailFormatValidator, nameValidator, numberValidator, telefonoValidator, usernameValidator } from '@app/components/features/AuthUser/validators.form';
import { ToolkitService } from '@app/core/services/api/toolkit.service';
import { UsersService } from '@app/core/services/api/users.service';
import { AuthService } from '@app/core/services/customs/auth.service';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit {
  private authService = inject(AuthService);
  private APIUsers = inject(UsersService);
  private APIToolkit = inject(ToolkitService);
  private messageService = inject(MessageService);

  private fb: FormBuilder = inject(FormBuilder);

  public getUploadImgUrl = this.APIToolkit.uploadImgUrl;
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
  public loading: boolean = false;

  public ngOnInit(): void {
    this.userForm = this.fb.group({
      cedula: [this.user.cedula, [Validators.required]],
      nombres: [this.user.nombres, [
        Validators.required,
        nameValidator()
      ]],
      nombre_usuario: [this.user.nombre_usuario, [
        Validators.required,
        usernameValidator()
      ]],
      localidad: [this.user.localidad, [Validators.required]],
      correo: [this.user.correo, [Validators.required, emailFormatValidator()]],
      imagen_url: [this.user.imagen_url, [Validators.required]]
    });

    this.loading = true;
    this.APIUsers.getMovil(this.user.cedula).subscribe({
      next: (responseMovil) => {
        this.APIToolkit.getBankList().subscribe({
          next: (responseBank) => {
            this.banklist = responseBank.data
            this.movilForm = this.fb.group({
              telefono: [responseMovil.data.telefono, [
                Validators.required,
                telefonoValidator()
              ]],
              cedula: [this.user.cedula, [
                Validators.required,
                numberValidator(),
                Validators.maxLength(8),
                Validators.minLength(7)
              ]],
              banco_num: [responseMovil.data.banco_num, [Validators.required]],
            })
          },
          error: (reason) => this.messageError(reason),
          complete: () => this.loading = false
        })
      },
      error: (reason) => this.messageError(reason),
    })

  }
  public changeEditar = () => this.editar = !this.editar;

  public changeEditarMovil = () => this.editarMovil = !this.editarMovil;

  public changeGuardar() {
    if (this.userForm.valid) {
      this.APIUsers.updateUser(this.userForm.value).subscribe({
        next: () => this.messageService.add({
          severity: 'success',
          summary: 'Datos guardados',
          detail: 'Datos guardados exitosamente. Reiniciar sesión para visualizar cambios.'
        }),
        error: (reason) => this.messageError(reason),
        complete: () => this.editar = !this.editar
      })
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error en el formulario',
        detail: 'El formulario no está completo.'
      })
    }
  }

  public changeGuardarMovil() {
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
      detail: 'Error al guardar datos.'
    })
  }

  @ViewChild('fileUpload') fileUpload!: FileUpload;
  public onSelectedFiles(event: any) {
    setTimeout(() => {
      if (event.currentFiles && event.currentFiles.length > 0) {
        this.fileUpload.upload();
      }
    }, 100);
  }

  handleUploadResponse(event: any) {
    if (event.originalEvent?.body) {
      try {
        const response = event.originalEvent.body.data;
        if (response.url) {
          this.userForm.value.imagen_url = response.url;
          this.user.imagen_url = response.url;

          this.messageService.add({ severity: 'success', summary: 'Imagen actualizada', detail: 'La foto de perfil se actualizó correctamente' });
        } else {
          console.error('Respuesta inesperada:', response);
          this.messageService.add({ severity: 'error', summary: 'Error de subida', detail: 'Error al intentar subir la imágen, comunicarse con la administración.' });
        }
      } catch (error) {
        console.error('Error procesando respuesta:', error);
        this.messageService.add({ severity: 'error', summary: 'Error con el servidor', detail: 'Error al intentar contactar con el servidor, intente más tarde.' });
      }
    }
    this.fileUpload.clear();
  }

  public selectEvent(choose: any, clear: any) {
    clear();
    choose();
  }
}
