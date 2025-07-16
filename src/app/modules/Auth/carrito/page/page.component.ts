import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { TestProductsService } from '@app/core/services/customs/test-products.service';


@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  public visible: boolean = false;
  public items: any[] = inject(TestProductsService).get();
  public dolar: any;

  ngOnInit(): void {
    this.getDollarRate().subscribe({
      next: (value: any) => this.dolar = value.rates?.VES,
      error: (reason) => {
        console.log(reason)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al consultar el precio del dolar.', life: 3000 });
      }
    })
  }

  calcTotal = () => this.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  calcTotalDolar = () => this.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0) * this.dolar;
  calcArticles = () => this.items.reduce((sum, item) => sum + item.cantidad, 0);
  getDollarRate = () => this.http.get('https://api.exchangerate-api.com/v4/latest/USD');

  addItem(item: any) {
    if (item.cantidad < item.existencias) {
      item.cantidad++;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Máximo alcanzado', life: 3000 });
    }
  }

  removeItem(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Mínimo alcanzado', life: 3000 });
    }
  }

  removeItemFromCart(item: any) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Artículo eliminado del carrito', life: 3000 });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Artículo no encontrado en el carrito', life: 3000 });
    }
  }


}

