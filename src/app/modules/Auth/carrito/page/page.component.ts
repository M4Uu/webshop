import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit {
  private http = inject(HttpClient)

  public items: any[] = [];
  public dolar: any;
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

  calcTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  getDollarRate() {
    return this.http.get('https://api.exchangerate-api.com/v4/latest/USD');
  }

  ngOnInit(): void {
    this.getDollarRate().subscribe({
      next: (value: any) => {
        this.dolar = value.rates?.VES;
      },
      error: (reason) => console.log(reason)
    })
    for (let index = 0; index < 8; index++) {
      this.items.push({
        id: index,
        name: this.jewelryNames[index] || `Jewelry Item ${index + 1}`,
        image: this.jewelryImages[index],
        price: (index + 1) * 10,
        quantity: 1,
        buy_date: Date()
      });
    }
  }
}

