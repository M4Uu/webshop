import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from '@app/core/services/api/pedidos.service';
import { Actualizar } from '@app/core/services/customs/actualizar.service';
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
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private APIpedidos = inject(PedidosService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private actualizar = inject(Actualizar);
  private subscription!: Subscription;

  public visible: boolean = false;
  public pedidos: any[] = [];
  public user = this.authService.loadSessionStorage();


  ngOnInit(): void {
    this.APIpedidos.getByCedula(this.user.cedula).subscribe({
      next: (response) => this.pedidos = response.data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    })

    this.subscription = this.actualizar.pedidoActualizado$.subscribe((newPedido) => {
      this.pedidos.push(newPedido);
    })
  }

  public createPedido() {
    this.visible = true;
    this.router.navigate(['detalle', 'create'], { relativeTo: this.route });
  }

  deletePedido(pedido: any) {
    this.APIpedidos.delete(Number(pedido.id)).subscribe({
      next: () => {
        this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Pedido eliminado exitosamente.', life: 3000 });
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
    })
  }

  showPedidoDetails(idPedido: any) {
    this.router.navigate(['detalle', idPedido], { relativeTo: this.route });
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
