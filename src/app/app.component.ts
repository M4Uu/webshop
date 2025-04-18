import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'test-pnpm';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      AOS.init();

      this.primengConfig.ripple = true;
    }

  }
}
