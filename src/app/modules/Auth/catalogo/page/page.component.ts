import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '@app/core/services/api/categoria.service';
import { ProductosService } from '@app/core/services/api/productos.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent implements OnInit {
  private APIproductos = inject(ProductosService);
  private APIcategorias = inject(CategoriaService);
  private messageService = inject(MessageService);

  public items: any[] = [];
  public itemsBackup: any[] = [];
  public categorias: any[] = [];
  public value: number = 3;
  public visible: boolean = false;
  public visibleFilter: boolean = false;
  public selectCategoria: any;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.APIcategorias.getCategoria().subscribe({
      next: (repsonse: any) => {
        this.categorias = repsonse.data;
        this.APIproductos.getCatalogo().subscribe({
          next: (repsonse: any) => {
            this.items = repsonse.data;
            this.itemsBackup = repsonse.data;
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
        });
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    });
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

}
