import { Component, inject, OnInit } from '@angular/core';
import { VentasService } from '@app/core/services/api/ventas.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: false
})
export class PageComponent implements OnInit {
  public APIVentas = inject(VentasService)
  public messageService = inject(MessageService);
  public ventas: any;
  public ventasIndex: number = -1;
  public loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.APIVentas.getVentas().subscribe({
      next: (response) => this.ventas = response.data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
      complete: () => this.loading = false
    });
  }

  setIndexVenta(indexVenta: number): void {
    this.ventasIndex = indexVenta;
    if (this.ventasIndex === -1) {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Seleccione una venta para ver los detalles.', life: 3000 });
    }
  }

  cantidadTotal = (venta: any) =>
    venta.productos.reduce((total: number, producto: any) => total + producto.cantidad, 0);

  generateCode = (ventas: any) => 'COD-' + ventas.id;
}
