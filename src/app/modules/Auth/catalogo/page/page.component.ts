import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent implements OnInit {
  public items: any[] = []
  public value: number = 3;
  public visible: boolean = false;
  public visibleFilter: boolean = false;
  private router = inject(Router);
  private route = inject(ActivatedRoute);


  public showDrawer(idProducto: number) {
    this.visible = true;
    this.router.navigate(['productos', idProducto], { relativeTo: this.route });
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

  private jewelryImages = [
    'https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-design-ring-png-image_13326726.png',
    'https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-design-ring-png-image_13326726.png',
    'https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-design-ring-png-image_13326726.png',
    'https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-design-ring-png-image_13326726.png',
    'https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-design-ring-png-image_13326726.png',
    'https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-design-ring-png-image_13326726.png',
    'https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-design-ring-png-image_13326726.png',
    'https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-design-ring-png-image_13326726.png',
  ];

  private jewelryNames = [
    'Diamond Ring', 'Gold Necklace', 'Sapphire Earrings',
    'Pearl Bracelet', 'Ruby Pendant', 'Emerald Brooch',
    'Platinum Watch', 'Topaz Hairpin'
  ];

  private descriptions = [
    'Elegant design with sparkling diamonds',
    'Handcrafted 24K gold necklace',
    'Exquisite sapphire stud earrings',
    'Freshwater pearl bracelet',
    'Vibrant ruby pendant on gold chain',
    'Vintage emerald and diamond brooch',
    'Luxury platinum automatic watch',
    'Delicate topaz hair accessory'
  ];

  randomHexColor(): string {
    const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    return `#${hex}`;
  }

  ngOnInit(): void {
    for (let index = 0; index < 8; index++) {
      this.items.push({
        id: index,
        name: this.jewelryNames[index] || `Jewelry Item ${index + 1}`,
        image: this.jewelryImages[index],
        description: this.descriptions[index] || `Description for item ${index + 1}`,
        price: (index + 1) * 10
      });
    }
  }

}
