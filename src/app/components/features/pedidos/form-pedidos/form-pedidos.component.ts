import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

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
    TextareaModule
  ],
  templateUrl: './form-pedidos.component.html',
  styleUrl: './form-pedidos.component.scss'
})
export class FormPedidosComponent implements OnInit {
  @Input() pedido: any;
  @Input() categorias: any;
  private fb = inject(FormBuilder);

  public pedidoForm!: FormGroup;

  public canEdit: boolean = false;

  ngOnInit(): void {
    if (this.pedido) {
      this.canEdit = true;
    } else {
      this.canEdit = false;
    }

    this.pedidoForm = this.fb.group({
      id: [this.pedido.id || null],
      nombre: [this.pedido.nombre || ''],
      descripcion: [this.pedido.descripcion || ''],
      cantidad: [this.pedido.cantidad || 0],
      categoria: [this.pedido.categorias || []]
    });

    if (this.pedido) {
      this.pedidoForm.patchValue(this.pedido);
    }
  }

  onSubmit() {

  }

  onEdit() {

  }

}
