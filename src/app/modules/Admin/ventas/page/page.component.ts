import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '@app/core/services/api/categoria.service';
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
  private APIcategorias = inject(CategoriaService);

  public visibleFilter: boolean = false;
  public ventas: any;
  public ventasBackup: any;
  public ventasIndex: number = -1;
  public loading: boolean = false;

  public categorias: any[] = [];
  public selectCategoria: any;
  public selectFecha: any;


  ngOnInit(): void {
    this.loading = true;
    this.APIcategorias.getCategoria().subscribe({
      next: (repsonse: any) => {
        this.categorias = repsonse.data;
        this.APIVentas.getVentas().subscribe({
          next: (response) => {
            this.ventas = response.data
            this.ventasBackup = response.data
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
          complete: () => this.loading = false
        });
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    });

  }

  setIndexVenta(indexVenta: number): void {
    this.ventasIndex = indexVenta;
    if (this.ventasIndex === -1) {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Seleccione una venta para ver los detalles.', life: 3000 });
    }
  }

  cantidadTotal = (venta: any) =>
    venta?.productos.reduce((total: number, producto: any) => total + producto.cantidad, 0);

  generateCode = (ventas: any) => 'COD-' + ventas?.id;

  public filterByCategory() {
    if (this.selectCategoria && this.selectCategoria.length > 0) {
      const categoriasSeleccionadas = this.selectCategoria.map((c: any) => c.name);

      this.ventas = this.ventasBackup.filter(item =>
        categoriasSeleccionadas.includes(item.categoria)
      );
    } else {
      this.ventas = [...this.ventasBackup];
    }
  }

  public filterByName(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.ventas = this.ventasBackup.filter(item =>
      item.nombres.toLowerCase().includes(searchTerm)
    );
  }

  filterByDate() {
    this.clearFechas();
    if (!this.selectFecha || this.selectFecha.length < 2) return;

    // Crear fechas en UTC para evitar problemas de zona horaria
    const startUTC = Date.UTC(
      this.selectFecha[0]?.getFullYear(),
      this.selectFecha[0]?.getMonth(),
      this.selectFecha[0]?.getDate()
    );

    const endUTC = Date.UTC(
      this.selectFecha[1]?.getFullYear(),
      this.selectFecha[1]?.getMonth(),
      this.selectFecha[1]?.getDate(),
      23, 59, 59, 999
    );

    this.ventas = this.ventas.filter(value => {
      const saleDate = new Date(value.fecha_compra).getTime();
      return saleDate >= startUTC;
      // return saleDate >= startUTC && saleDate <= endUTC;
    });
    console.log(this.ventas);
  }


  clearFechas() {
    this.ventas = [... this.ventasBackup]
  }
}
