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
import { TestProductsService } from '@app/core/services/test-products.service';

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
    SelectModule
  ],
  templateUrl: './form-pedidos.component.html',
  styleUrl: './form-pedidos.component.scss'
})
export class FormPedidosComponent implements OnInit, OnDestroy {
  @Input() categorias: any;
  private productService = inject(TestProductsService)
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private index = this.route.snapshot.paramMap.get('id');
  public pedidoForm!: FormGroup;
  public isCreate = this.index == 'create';


  public editar: boolean = false;

  ngOnInit(): void {
    if (this.isCreate) {
      this.pedidoForm = this.fb.group({
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        cantidad: [0, [Validators.required]],
        categoria: [[], [Validators.required]]
      });
    } else {
      const pedido = this.productService.get()[Number(this.index)];
      this.pedidoForm = this.fb.group({
        nombre: [pedido.nombre, [Validators.required]],
        descripcion: [pedido.descripcion, [Validators.required]],
        cantidad: [pedido.cantidad, [Validators.required]],
        categoria: [pedido.categoria, [Validators.required]]
      });
    }
  }

  onSubmit() {

  }

  onEdit() {
    this.editar = !this.editar;
  }

  ngOnDestroy() {
    console.log('Componente destruido');
    this.pedidoForm.reset();
    this.editar = false;
  }
}
