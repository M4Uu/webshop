import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  public visible: boolean = false;
  public pedido: any;
  public pedidos: any[] = [
    { id: 1, cliente: 'Cliente A', total: 100, fecha: '2023-10-01', estado: 'Sin recoger' },
    { id: 2, cliente: 'Cliente B', total: 200, fecha: '2023-10-02', estado: 'Sin recoger' },
    { id: 3, cliente: 'Cliente C', total: 300, fecha: '2023-10-03', estado: 'Sin recoger' },
  ];
  public createPedido() {
    // Aquí puedes implementar la lógica para crear un nuevo pedido
    console.log('Crear nuevo pedido');
    this.pedido = null;
    this.visible = true;
  }

  deletePedido(pedido: any) {
    // Aquí puedes implementar la lógica para eliminar un pedido
    console.log('Eliminar pedido', pedido);
    this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
  }

  showPedidoDetails(pedido: any) {
    // Aquí puedes implementar la lógica para mostrar los detalles de un pedido
    console.log('Detalles del pedido', pedido);
    this.pedido = pedido;
    this.visible = true;
  }
}
