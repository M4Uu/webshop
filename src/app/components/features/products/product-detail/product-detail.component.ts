import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '@app/core/services/api/productos.service';
import { TestProductsService } from '@app/core/services/customs/test-products.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-product-detail',
  imports: [
    RatingModule,
    FormsModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private APIproductos = inject(ProductosService)
  public messageService = inject(MessageService);

  public item: any;
  public value = 3;
  public loading: boolean = false;

  ngOnInit() {
    const index = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.APIproductos.getProductosById(index).subscribe({
      next: (response) => this.item = response.data[0],
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al contectar con el servidor, intente más tarde.', life: 3000 }),
      complete: () => this.loading = false,
    });
  }
}
