import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestProductsService } from '@app/core/services/customs/test-products.service';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  private route = inject(ActivatedRoute)
  private router = inject(Router);

  public visible: boolean = false;
  public pedido: any;
  public pedidos: any[] = inject(TestProductsService).getForm();
  public createPedido() {
    this.visible = true;
    this.router.navigate(['detalle', 'create'], { relativeTo: this.route });
  }

  deletePedido(pedido: any) {
    this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
  }

  showPedidoDetails(idPedido: any) {
    this.router.navigate(['detalle', idPedido], { relativeTo: this.route });
    this.visible = true;
  }

  public hideDrawer() {
    this.visible = false;
    this.router.navigate(['.'], { relativeTo: this.route });
  }
}
