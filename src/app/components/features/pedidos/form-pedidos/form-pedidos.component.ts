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
import { Tooltip } from 'primeng/tooltip';

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
    Tooltip
  ],
  templateUrl: './form-pedidos.component.html',
  styleUrl: './form-pedidos.component.scss'
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
    categoria: [[], [Validators.required]]
  });
  public user = this.authService.loadSessionStorage();

  public isCreate = this.index == 'create';
  public categorias: any[] = [];
  public editar: boolean = false;
  public loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.APICategoria.getCategoria().subscribe({
      next: (resCategoria) => {
        this.categorias = resCategoria.data;
        if (this.isCreate) {
          this.pedidoForm = this.fb.group({
            nombre: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            cantidad: [0, [Validators.required]],
            categoria: [[], [Validators.required]]
          });
          this.editar = true;
          this.loading = false;
        } else {
          this.APIpedidos.getById(Number(this.index)).subscribe({
            next: (resPedido) => {
              const pedido = resPedido.data;
              this.pedidoForm = this.fb.group({
                nombre: [pedido.nombre, [Validators.required]],
                descripcion: [pedido.descripcion, [Validators.required]],
                cantidad: [pedido.cantidad, [Validators.required]],
                categoria: [this.categorias.find(value => value.code == pedido.categoria_id), [Validators.required]]
              });
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
            complete: () => this.loading = false
          })
        }
      }
    });
  }

  onSubmit() {
    const form = this.pedidoForm.value;
    if (form.categoria) {
      if (this.isCreate) {
        this.APIpedidos.create({
          cedula: this.user.cedula,
          nombre: form.nombre,
          descripcion: form.descripcion,
          cantidad: form.cantidad,
          categoria_id: form.categoria['code']
        }).subscribe({
          next: (response) => {
            this.actualizar.notificarActualizacionPedido(response.data);
            this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Pedido creado satisfactoriamente.', life: 3000 });
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
        });
      } else {
        this.APIpedidos.update({
          cedula: this.user.cedula,
          nombre: form.nombre,
          descripcion: form.descripcion,
          cantidad: form.cantidad,
          categoria_id: form.categoria['code']
        }).subscribe({
          next: () => this.messageService.add({ severity: 'success', summary: 'Editado', detail: 'Pedido editado satisfactoriamente.', life: 3000 }),
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
        })
      }
    }
  }

  onEdit() {
    this.editar = !this.editar;
  }

  ngOnDestroy() {
    this.pedidoForm.reset();
    this.editar = false;
  }
}
