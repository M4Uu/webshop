import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TestProductsService } from '@app/core/services/customs/test-products.service';
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
  private productService = inject(TestProductsService)
  public items: any = [];
  public value = 3;
  public medidas = [
    { name: 'Longitud 1', value: 10 },
    { name: 'Grosor 1', value: 20 },
    { name: 'Longitud 2', value: 10 },
    { name: 'Grosor 2', value: 20 },
    { name: 'Longitud 2', value: 10 },
    { name: 'Grosor 2', value: 20 },
    { name: 'Longitud 2', value: 10 },
    { name: 'Grosor 2', value: 20 },
    { name: 'Longitud 2', value: 10 },
    { name: 'Grosor 2', value: 20 },
  ];

  public materiales = [
    { name: 'Material 1', descripcion: 'Descripción del material 1' },
    { name: 'Material 2', descripcion: 'Descripción del material 2' },
    { name: 'Material 3', descripcion: 'Descripción del material 3' },
    { name: 'Material 4', descripcion: 'Descripción del material 4' },
    { name: 'Material 5', descripcion: 'Descripción del material 5' },
    { name: 'Material 6', descripcion: 'Descripción del material 6' },
    { name: 'Material 7', descripcion: 'Descripción del material 7' },
    { name: 'Material 8', descripcion: 'Descripción del material 8' },
  ];

  ngOnInit() {
    const index = Number(this.route.snapshot.paramMap.get('id'));
    this.items = this.productService.get()[index];
  }
}
