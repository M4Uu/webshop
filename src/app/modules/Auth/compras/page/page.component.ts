import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestProductsService } from '@app/core/services/test-products.service';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  public items: any = inject(TestProductsService).get();
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public visible: boolean = false;

  public showDrawer(idProducto: number) {
    this.visible = true;
    this.router.navigate(['producto', idProducto], { relativeTo: this.route });
  }

  public hideDrawer() {
    this.visible = false;
    this.router.navigate(['.'], { relativeTo: this.route });
  }
}
