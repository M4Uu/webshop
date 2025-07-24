import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '@app/core/services/api/productos.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: false
})
export class PageComponent implements OnInit {
  private APIProductos = inject(ProductosService);

  private route = inject(ActivatedRoute)
  private router = inject(Router);
  public messageService = inject(MessageService);

  public visible: boolean = false;
  public pedido: any;
  public productos: any[] = [];
  public loading: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.APIProductos.getProductos().subscribe({
      next: (response) => this.productos = response.data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
      complete: () => this.loading = false
    })
  }

  public createPedido() {
    this.visible = true;
    this.router.navigate(['detalle', 'create'], { relativeTo: this.route });
  }

  deletePedido(pedido: any) {
    this.productos = this.productos.filter(p => p.id !== pedido.id);
  }

  showProductoDetails(idProducto: string) {
    this.router.navigate(['detalle', idProducto], { relativeTo: this.route });
    this.visible = true;
  }

  public hideDrawer() {
    this.visible = false;
    this.router.navigate(['.'], { relativeTo: this.route });
  }
}
