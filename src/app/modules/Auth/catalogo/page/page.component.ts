import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestProductsService } from '@app/core/services/test-products.service';


@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  public items: any[] = inject(TestProductsService).get();
  public value: number = 3;
  public visible: boolean = false;
  public visibleFilter: boolean = false;
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

  public selectCategoria: any;
  public categoria = [
    { name: 'Anillos', code: 'AN' },
    { name: 'Collares', code: 'CO' },
    { name: 'Pendientes', code: 'PE' },
    { name: 'Pulseras', code: 'PU' },
    { name: 'Relojes', code: 'RE' },
    { name: 'Broches', code: 'BR' },
    { name: 'Diademas', code: 'DI' },
    { name: 'Anillos de compromiso', code: 'AC' }
  ]

  getTextUntilFirstDot = (text: string): string => {
    return text.split('.')[0];
  };

}
