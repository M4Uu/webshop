import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentasService } from '@app/core/services/api/ventas.service';
import { AuthService } from '@app/core/services/customs/auth.service';
import { TestProductsService } from '@app/core/services/customs/test-products.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  public APIVentas = inject(VentasService);
  public authService = inject(AuthService);
  public messageService = inject(MessageService);
  public ventas: any;
  public ventasIndex: number = -1;
  public loading: boolean = false;

  public user = this.authService.loadSessionStorage();

  ngOnInit(): void {
    this.loading = true;
    this.APIVentas.getVentasByCedula(Number(this.user.cedula)).subscribe({
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
