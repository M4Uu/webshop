import { afterNextRender, ChangeDetectorRef, Component, inject } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CommonModule } from '@angular/common';

interface Image {
  itemImageSrc: string; thumbnailImageSrc: string; alt: string
}

interface Responsive {
  breakpoint: string; numVisible: number
}

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    GalleriaModule,
    CommonModule
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})

export class PageComponent {

  public activeIndex = 0;
  public isHydrated = false;
  private cdr = inject(ChangeDetectorRef);
  constructor() {
    afterNextRender(() => {
      setTimeout(() => {
        this.isHydrated = true;
        this.cdr.detectChanges();
      });
    });
  }

  public images: Image[] = [
    {
      itemImageSrc: "https://i.pinimg.com/736x/42/b2/a7/42b2a72ec3f4fabccbe187d57cce9898.jpg",
      thumbnailImageSrc: "https://i.pinimg.com/736x/42/b2/a7/42b2a72ec3f4fabccbe187d57cce9898.jpg",
      alt: "Description for Image 1"
    },
    {
      itemImageSrc: "https://mujerdeportada.com/wp-content/uploads/2021/12/joyeria-1.jpg",
      thumbnailImageSrc: "https://mujerdeportada.com/wp-content/uploads/2021/12/joyeria-1.jpg",
      alt: "Description for Image 2"
    },
    {
      itemImageSrc: "https://www.primefaces.org/cdn/primeng/images/galleria/galleria3.jpg",
      thumbnailImageSrc: "https://www.primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg",
      alt: "Description for Image 3"
    },
    {
      itemImageSrc: "https://www.primefaces.org/cdn/primeng/images/galleria/galleria4.jpg",
      thumbnailImageSrc: "https://www.primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg",
      alt: "Description for Image 4"
    },
    {
      "itemImageSrc": "https://www.primefaces.org/cdn/primeng/images/galleria/galleria5.jpg",
      "thumbnailImageSrc": "https://www.primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg",
      "alt": "Description for Image 5"
    }
  ];

  responsiveOptions: Responsive[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

}
