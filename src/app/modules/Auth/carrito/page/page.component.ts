import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { CarritoService } from '@app/core/services/api/carrito.service';
import { AuthService } from '@app/core/services/customs/auth.service';


@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit {
  private authService = inject(AuthService);
  private APIcarrito = inject(CarritoService);
  private messageService = inject(MessageService);
  private http = inject(HttpClient);

  public visible: boolean = false;
  public items: any[] = [];
  public dolar: any;
  public user = this.authService.loadSessionStorage();

  ngOnInit(): void {
    this.getDolarRate().subscribe({
      next: (value: any) => this.dolar = value.rates?.VES,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al consultar el precio del dolar.', life: 3000 }),
      complete: () => {
        this.APIcarrito.getCarrito(Number(this.user.cedula)).subscribe({
          next: (response) => this.items = response.data,
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar el carrito.', life: 3000 })
        });
      }
    })
  }

  resetItems() {
    this.items = []
  }

  calcTotal = () => this.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  calcTotalBolivar = () => this.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0) * this.dolar;
  calcArticles = () => this.items.reduce((sum, item) => sum + Number(item.cantidad), 0);
  getDolarRate = () => this.http.get('https://api.exchangerate-api.com/v4/latest/USD');

  addItem(item: any) {
    if (item.cantidad < item.existencias) {
      const data = { cedula: this.user.cedula, id_producto: item.id };
      this.APIcarrito.aumentarCantidad(data).subscribe({
        next: () => item.cantidad++,
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
      })
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Máximo alcanzado', life: 3000 });
    }
  }

  removeItem(item: any) {
    if (item.cantidad > 1) {
      const data = { cedula: this.user.cedula, id_producto: item.id };
      this.APIcarrito.disminuirCantidad(data).subscribe({
        next: () => item.cantidad--,
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
      })
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Mínimo alcanzado', life: 3000 });
    }
  }

  removeItemFromCart(item: any, index: number) {
    const data = { cedula: this.user.cedula, id_producto: item.id }
    this.APIcarrito.eliminar(data).subscribe({
      next: () => {
        this.items.splice(index, 1);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Artículo eliminado del carrito', life: 3000 });
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),

    })
  }


}

