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

  notificarActualizacion(idProducto: number) {
    this.carritoActualizadoSource.next(idProducto);
  }

  notificarActualizacionGuardado(producto: any) {
    this.guardadoActualizadoSource.next(producto);
  }

  notificarActualizacionPedido(producto: any) {
    this.pedidoActualizadoSource.next(producto);
  }
}
