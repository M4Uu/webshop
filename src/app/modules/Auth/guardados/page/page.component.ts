import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '@app/core/services/api/categoria.service';
import { GuardadosService } from '@app/core/services/api/guardados.service';
import { AuthService } from '@app/core/services/customs/auth.service';
import { TestProductsService } from '@app/core/services/customs/test-products.service';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit {
  private APIguardados = inject(GuardadosService);
  private APIcategoria = inject(CategoriaService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);

  public visible: boolean = false;
  public items: any[] = ;
  public user = this.authService.loadSessionStorage();


  public categorias: any[] = [];
  public selectedCategoria: any;

  public filters = {
    categorias: null,
    nombre: null,
  }

  ngOnInit(): void {
    this.APIcategoria.getCategoria().subscribe({
      next: (response) => {
        this.categorias = response.data;
      },
      error: () => { },
      complete: () => {
        this.APIguardados.getGuardados(123456789).subscribe({
          next: (response) => {
            console.log('Guardados:', response);
          },
          error: (error) => {
            console.error('Error fetching guardados:', error);
          }
        });
      }
    });


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
