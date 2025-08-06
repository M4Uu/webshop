import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Actualizar {
  private carritoActualizadoSource = new Subject<number>();
  carritoActualizado$ = this.carritoActualizadoSource.asObservable();

  private guardadoActualizadoSource = new Subject<any>();
  guardadoActualizado$ = this.guardadoActualizadoSource.asObservable();

  private pedidoActualizadoSource = new Subject<any>();
  pedidoActualizado$ = this.pedidoActualizadoSource.asObservable();

  private productoActualizadoSource = new Subject<any>();
  productoActualizado$ = this.productoActualizadoSource.asObservable();

  notificarActualizacion(idProducto: number) {
    this.carritoActualizadoSource.next(idProducto);
  }

  notificarActualizacionGuardado(producto: any) {
    this.guardadoActualizadoSource.next(producto);
  }

  notificarActualizacionPedido(producto: any) {
    this.pedidoActualizadoSource.next(producto);
  }

  notificarActualizacionProducto(producto: any) {
    this.productoActualizadoSource.next(producto);
  }
}
