import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '@app/core/services/api/users.service';
import { AuthService } from '@app/core/services/customs/auth.service';
import { MessageService } from 'primeng/api';
import { telefonoValidator } from '../../AuthUser/validators.form';
import { ToolkitService } from '@app/core/services/api/toolkit.service';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CarritoService } from '@app/core/services/api/carrito.service';
import { VentasService } from '@app/core/services/api/ventas.service';

@Component({
  selector: 'app-pasarela-pago',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Select,
    InputNumber,
    InputText,
    Button,
    RouterModule
  ],
  templateUrl: './pasarela-pago.component.html',
  styleUrl: './pasarela-pago.component.scss'
})
export class PasarelaPagoComponent implements OnInit {
  @Input() productos?: any[];
  @Input() dolar?: number;
  @Input() totalBolivares?: number;
  @Input() totalDolar?: number;
  @Output() reiniciarItems = new EventEmitter<void>();

  private authService = inject(AuthService);
  public messageService = inject(MessageService);
  private APIUsers = inject(UsersService);
  private APIToolkit = inject(ToolkitService);
  private APIcarrito = inject(CarritoService);
  private APIventas = inject(VentasService);
  private fb: FormBuilder = inject(FormBuilder);


  public user = this.authService.loadSessionStorage();
  public banklist: any;
  public movilForm = this.fb.group({
    telefono: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    banco_num: [, [Validators.required]],
  });


  ngOnInit() {
    this.APIUsers.getMovil(this.user.cedula).subscribe({
      next: (responseMovil) => {
        this.APIToolkit.getBankList().subscribe({
          next: (responseBank) => {
            this.banklist = responseBank.data
            this.movilForm = this.fb.group({
              telefono: [responseMovil.data.telefono, [Validators.required, telefonoValidator()]],
              cedula: [this.user.cedula, [Validators.required]],
              banco_num: [responseMovil.data.banco_num, [Validators.required]],
            })
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
        })
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    })
  }

  onSubmit() {
    const data = {
      cedula: this.user.cedula,
      productos: this.productos?.map(p => { return { id: p.id, cantidad: Number(p.cantidad) } })
    }
    this.APIcarrito.vendido(data).subscribe({
      next: () => {
        const dataVenta = {
          cedula: Number(this.user.cedula),
          total_bolivares: this.totalBolivares,
          total: this.dolar,
          dolar: this.dolar,
          productos: this.productos
        }
        this.APIventas.insertar(dataVenta).subscribe({
          next: () => {
            this.reiniciarItems.emit();
            this.messageService.add({ severity: 'success', summary: 'Pago realizada', detail: 'La compra se ha realizado correctamente.', life: 3000 })
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
        })
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    })
  }
}
