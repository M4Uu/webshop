import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '@app/core/services/api/productos.service';
import { Actualizar } from '@app/core/services/customs/actualizar.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: false
})
export class PageComponent implements OnInit {
  private APIProductos = inject(ProductosService);
  private actualizar = inject(Actualizar);

  private subscription!: Subscription;
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  public messageService = inject(MessageService);

  public visible: boolean = false;
  public producto: any;
  public productos: any[] = [];
  public loading: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.APIProductos.getProductos().subscribe({
      next: (response) => this.productos = response.data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
      complete: () => this.loading = false
    })
    this.subscription = this.actualizar.productoActualizado$.subscribe(producto => {
      this.productos.push(producto);
    });
  }

  public createProducto() {
    this.visible = true;
    this.router.navigate(['detalle', 'create'], { relativeTo: this.route });
  }

  deleteProducto(producto: any) {
    const data = { producto_id: producto.id }
    // this.productos = this.productos.filter(p => p.id !== producto.id);
    producto.existencias = 0;
    this.messageService.add({ severity: 'success', summary: 'Inhabilitado', detail: 'Se ha reducido el stock del producto a 0, no será visible para los usuarios.', life: 3000 })
    // this.APIProductos.inhabilitar(data).subscribe({
    //   next: (response) => {
    //   },
    //   error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    // })

  }

  showProductoDetails(idProducto: string) {
    this.router.navigate(['detalle', idProducto], { relativeTo: this.route });
    this.visible = true;
  }

  public hideDrawer() {
    this.visible = false;
    this.router.navigate(['.'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
