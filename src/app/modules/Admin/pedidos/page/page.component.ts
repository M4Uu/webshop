import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from '@app/core/services/api/pedidos.service';
import { Actualizar } from '@app/core/services/customs/actualizar.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  standalone: false
})
export class PageComponent {
  private APIpedidos = inject(PedidosService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private actualizar = inject(Actualizar);

  public subscription!: Subscription;
  public messageService = inject(MessageService);

  public visible: boolean = false;
  public pedidos: any[] = [];
  public loading: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.APIpedidos.get().subscribe({
      next: (response) => this.pedidos = response.data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
      complete: () => this.loading = false
    })

    this.subscription = this.actualizar.pedidoActualizado$.subscribe((newPedido) => {
      this.pedidos = this.pedidos.filter(pedido => pedido.id !== newPedido.id);
      this.pedidos.push(newPedido);
    })
  }

  showPedidoDetails(idPedido: string) {
    this.router.navigate(['detalle', idPedido], { relativeTo: this.route });
    this.visible = true;
  }

  public hideDrawer() {
    this.visible = false;
    this.router.navigate(['.'], { relativeTo: this.route });
  }
}
