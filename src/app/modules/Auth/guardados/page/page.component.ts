import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '@app/core/services/api/categoria.service';
import { GuardadosService } from '@app/core/services/api/guardados.service';
import { Actualizar } from '@app/core/services/customs/actualizarcarrito.service';
import { AuthService } from '@app/core/services/customs/auth.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit, OnDestroy {
  private APIguardados = inject(GuardadosService);
  private APIcategoria = inject(CategoriaService);
  private messageService = inject(MessageService);
  private actualizarService = inject(Actualizar);


  private authService = inject(AuthService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private subscription!: Subscription;

  public visible: boolean = false;
  public items: any[] = [];
  public itemsBackup: any[] = [];
  public user = this.authService.loadSessionStorage();


  public categorias: any[] = [];
  public selectCategoria: any;
  public loading: boolean = false;

  public filters = {
    categorias: null,
    nombre: null,
  }

  ngOnInit(): void {
    this.loading = true;
    this.APIcategoria.getCategoria().subscribe({
      next: (response) => {
        this.categorias = response.data;
        this.APIguardados.getGuardados(Number(this.user.cedula)).subscribe({
          next: (response) => {
            this.items = response.data;
            this.itemsBackup = response.data;
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
          complete: () => this.loading = false
        });
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    });
    this.subscription = this.actualizarService.guardadoActualizado$.subscribe(
      (producto) => { this.actualizarGuardado(producto) }
    )
  }

  actualizarGuardado(producto: any) {
    switch (producto.do) {
      case 'eliminar': {
        const obj = this.items.find(value => value.id = producto.data.id)
        const index = this.items.indexOf(obj);
        this.items.splice(index, 1);
      }; break;
      case 'insertar': {
        this.items.push(producto.data);
      }; break;
    }
  }

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
    const searchTerm = event.toLowerCase();
    this.items = this.itemsBackup.filter(item =>
      item.nombre.toLowerCase().includes(searchTerm)
    );
  }

  public showDrawer(idProducto: number) {
    this.visible = true;
    this.router.navigate(['producto', idProducto], { relativeTo: this.route });
  }

  public hideDrawer() {
    this.visible = false;
    this.router.navigate(['.'], { relativeTo: this.route });
  }

  getTextUntilFirstDot = (text: string): string => text.split('.')[0];
  calificacion = (item: any) => item.calificacion / item.veces_valorado;

  isAtTop = true;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isAtTop = currentScrollPosition === 0;
    if (!this.isAtTop) {
      // Scroll abandonó el punto inicial
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
