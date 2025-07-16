import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestProductsService } from '@app/core/services/customs/test-products.service';


@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  private productsService = inject(TestProductsService);
  public items: any[] = this.productsService.get();
  public value: number = 3;
  public visible: boolean = false;
  public visibleFilter: boolean = false;
  public selectCategoria: any;
  public categoria = this.productsService.categorias();

  private router = inject(Router);
  private route = inject(ActivatedRoute);

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

}
