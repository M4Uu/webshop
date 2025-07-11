import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestProductsService } from '@app/core/services/test-products.service';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit {
  private productsService = inject(TestProductsService);
  public items = this.productsService.get();
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  public visible: boolean = false;

  public categorias = this.productsService.categorias();
  public selectedCategoria: any;

  public filters = {
    categorias: null,
    nombre: null,
  }

  ngOnInit(): void {
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

  isAtTop = true;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isAtTop = currentScrollPosition === 0;
    if (!this.isAtTop) {
      // Scroll abandonó el punto inicial
    }
  }
}
