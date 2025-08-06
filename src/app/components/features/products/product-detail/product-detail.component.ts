import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '@app/core/services/api/carrito.service';
import { GuardadosService } from '@app/core/services/api/guardados.service';
import { ProductosService } from '@app/core/services/api/productos.service';
import { Actualizar } from '@app/core/services/customs/actualizar.service';
import { AuthService } from '@app/core/services/customs/auth.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-product-detail',
  imports: [
    RatingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public messageService = inject(MessageService);
  private authService = inject(AuthService);
  private actualizarService = inject(Actualizar);

  private APIproductos = inject(ProductosService)
  private APIguardados = inject(GuardadosService);
  private APIcarrito = inject(CarritoService);

  public user = this.authService.loadSessionStorage();

  public item: any;
  public value = 3;
  public loading: boolean = false;
  public timerMessage: boolean = false;
  public tenkiuTimer: boolean = true;


  ngOnInit() {
    const index = Number(this.route.snapshot.paramMap.get('id'));
    const data = { cedula: this.user.cedula, producto_id: index };
    this.loading = true;
    this.APIproductos.getProductosById(data).subscribe({
      next: (response) => this.item = response.data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
      complete: () => {
        this.loading = false
        setTimeout(() => {
          this.timerMessage = true;
        }, 5000);
      },
    });
  }

  toggleGuardado(item: any, event: any) {
    event.stopPropagation();
    const data = { cedula: this.user.cedula, producto_id: Number(item.id) };
    if (item.en_guardados) {
      this.APIguardados.eliminar(data).subscribe({
        next: () => {
          item.en_guardados = !item.en_guardados;
          this.actualizarService.notificarActualizacionGuardado({ data: item, do: 'eliminar' });
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar guardar el producto, intente más tarde.', life: 3000 }),
      });
    } else {
      this.APIguardados.insertar(data).subscribe({
        next: () => {
          item.en_guardados = !item.en_guardados;
          this.actualizarService.notificarActualizacionGuardado({ data: item, do: 'insertar' });
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar eliminar el elemento guardado, intente más tarde.', life: 3000 }),
      });
    }
  }

  insertarCarrito() {
    const data = { cedula: Number(this.user.cedula), id_producto: this.item.id }
    this.APIcarrito.insertar(data).subscribe({
      next: () => {
        this.item.en_carrito = !this.item.en_carrito;
        this.actualizarService.notificarActualizacion(this.item.id);
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar añadir el producto al carrito, intente más tarde.', life: 3000 }),
    })
  }

  calificacion = () => this.item.calificacion / this.item.veces_valorado;

  setCalificacion() {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      this.tenkiuTimer = false;
      const data = {
        id: this.item.id,
        calificacion: this.item.calificacion
      }
      this.APIproductos.calificacion(data).subscribe({
        next: () => setTimeout(() => {
          this.tenkiuTimer = true;
        }, 5000),
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar añadir el producto al carrito, intente más tarde.', life: 3000 }),
      })
    }, 1000);
  }
}
