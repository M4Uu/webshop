import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '@app/core/services/api/pedidos.service';
import { MessageService } from 'primeng/api';
import { CategoriaService } from '@app/core/services/api/categoria.service';
import { Skeleton } from 'primeng/skeleton';
import { AuthService } from '@app/core/services/customs/auth.service';
import { Actualizar } from '@app/core/services/customs/actualizar.service';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-form-pedidos',
  imports: [
    FormsModule,
    CommonModule,
    FloatLabelModule,
    MultiSelectModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    SelectModule,
    Skeleton,
    DatePickerModule
  ],
  templateUrl: './form-pedidos-admin.component.html',
  styleUrl: './form-pedidos-admin.component.scss'
})
export class FormPedidosComponent implements OnInit, OnDestroy {
  private APIpedidos = inject(PedidosService);
  private APICategoria = inject(CategoriaService);
  private authService = inject(AuthService);
  private actualizar = inject(Actualizar);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  private index = this.route.snapshot.paramMap.get('id');
  public pedidoForm = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    cantidad: [0, [Validators.required]],
    fecha_cita: [new Date(), [Validators.required]],
    categoria: [[], [Validators.required]],
    prioridad: [[], [Validators.required]]
  });
  public user = this.authService.loadSessionStorage();

  public isCreate = this.index == 'create';
  public categorias: any[] = [];
  public prioridad: any[] = [];
  public loading: boolean = false;

  public minDate: Date = new Date();

  ngOnInit(): void {
    this.loading = true;
    this.APICategoria.getCategoria().subscribe({
      next: (resCategoria) => {
        this.categorias = resCategoria.data;
        this.APIpedidos.getPrioridad().subscribe({
          next: (resPrioridad) => {
            this.prioridad = resPrioridad.data;
            this.APIpedidos.getById(Number(this.index)).subscribe({
              next: (resPedido) => {
                const pedido = resPedido.data;
                this.pedidoForm = this.fb.group({
                  nombre: [pedido.nombre, [Validators.required]],
                  descripcion: [pedido.descripcion, [Validators.required]],
                  cantidad: [pedido.cantidad, [Validators.required]],
                  fecha_cita: [pedido.fecha_cita ? new Date(pedido.fecha_cita) : new Date(), [Validators.required]],
                  categoria: [this.categorias.find(value => value.code == pedido.categoria_id), [Validators.required]],
                  prioridad: [this.prioridad.find(value => value.code == pedido.prioridad_id), [Validators.required]]
                });
              },
              error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
              complete: () => this.loading = false
            })
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
        })
      }
    });
  }

  onSubmit() {
    this.APIpedidos.updateAdmin({
      pedido_id: Number(this.index),
      prioridad: this.pedidoForm.value.prioridad,
      fecha_cita: this.pedidoForm.value.fecha_cita?.toISOString()
    }).subscribe({
      next: (response) => {
        this.actualizar.notificarActualizacionPedido(response.data);
        this.messageService.add({ severity: 'success', summary: 'Editado', detail: 'Pedido editado satisfactoriamente.', life: 3000 })
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    })
  }

  ngOnDestroy() {
    this.pedidoForm.reset();
  }
}
