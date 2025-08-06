import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailFormatValidator, nameValidator } from '@app/components/features/AuthUser/validators.form';
import { UsersService } from '@app/core/services/api/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-page',
  host: {
    'data-component': 'contact'
  },
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: false
})
export class PageComponent {
  private APIusers = inject(UsersService);
  public messageService = inject(MessageService);

  private fb: FormBuilder = inject(FormBuilder);
  public contactForm = this.fb.group({
    nombres: ['', [Validators.required, nameValidator()]],
    correo: ['', [Validators.required, emailFormatValidator()]],
    mensaje: ['', [Validators.required]]
  })

  enviar = () => {
    let timeout: any;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (this.contactForm.valid) {
        this.APIusers.enviarReporte(this.contactForm.value).subscribe({
          next: () => this.messageService.add({ severity: 'success', summary: 'Enviado', detail: 'Su mensaje ha sido enviado correctamente.', life: 3000 }),
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
        })
      }
    }, 2000);
  }

}
