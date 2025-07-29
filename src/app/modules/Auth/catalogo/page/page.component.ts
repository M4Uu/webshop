import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '@app/core/services/api/categoria.service';
import { GuardadosService } from '@app/core/services/api/guardados.service';
import { ProductosService } from '@app/core/services/api/productos.service';
import { Actualizar } from '@app/core/services/customs/actualizarcarrito.service';
import { AuthService } from '@app/core/services/customs/auth.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent implements OnInit {
  private APIproductos = inject(ProductosService);
  private APIcategorias = inject(CategoriaService);
  private APIguardados = inject(GuardadosService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private actualizaCarritoService = inject(Actualizar);

  public items: any[] = [];
  public itemsBackup: any[] = [];
  public categorias: any[] = [];
  public value: number = 3;
  public visible: boolean = false;
  public visibleFilter: boolean = false;
  public selectCategoria: any;
  public user = this.authService.loadSessionStorage();
  public loading: boolean = false;

  private subscription!: Subscription;
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loading = true;
    this.APIcategorias.getCategoria().subscribe({
      next: (repsonse: any) => {
        this.categorias = repsonse.data;
        this.APIproductos.getCatalogo(Number(this.user.cedula)).subscribe({
          next: (repsonse: any) => {
            this.items = repsonse.data;
            this.itemsBackup = repsonse.data;
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
          complete: () => this.loading = false
        });
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    });

    this.subscription = this.actualizaCarritoService.carritoActualizado$.subscribe(idProducto => {
      this.actualizarEstadoCarrito(idProducto);
    });
  }

  public actualizarEstadoCarrito(idProducto: number) {
    const producto = this.items.find(p => p.id === idProducto);
    if (producto) {
      producto.en_carrito = !producto.en_carrito;
    }
  }

  public showDrawer(idProducto: number) {
    this.visible = true;
    this.router.navigate(['producto', idProducto], { relativeTo: this.route });
  }

  public hideDrawer() {
    this.visible = false;
    this.router.navigate(['.'], { relativeTo: this.route });
  }

  getTextUntilFirstDot = (text: string): string => {
    return text.split('.')[0];
  };
  calificacion = (item: any) => item.calificacion / item.veces_valorado;


  public filterByCategory() {
    if (this.selectCategoria && this.selectCategoria.length > 0) {
      const categoriasSeleccionadas = this.selectCategoria.map((c: any) => c.name);

      this.items = this.itemsBackup.filter(item =>
        categoriasSeleccionadas.includes(item.categoria)
      );
    } else {
      this.items = [...this.itemsBackup];
    }
  }

  public filterByName(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.items = this.itemsBackup.filter(item =>
      item.nombre.toLowerCase().includes(searchTerm)
    );
  }

  toggleGuardado(item: any, event: any) {
    event.stopPropagation();
    const data = { cedula: this.user.cedula, producto_id: item.id };
    if (item.en_guardados) {
      this.APIguardados.eliminar(data).subscribe({
        next: () => item.en_guardados = !item.en_guardados,
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar guardar el producto, intente más tarde.', life: 3000 }),
      });
    } else {
      this.APIguardados.insertar(data).subscribe({
        next: () => item.en_guardados = !item.en_guardados,
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar eliminar el elemento guardado, intente más tarde.', life: 3000 }),
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
