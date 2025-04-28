import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { AosService } from './global/aos-service/aosservice.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'test-pnpm';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private primengConfig: PrimeNGConfig,
    private aosService: AosService,
  ) {}

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.aosService.init();

      window.addEventListener('load', () => {
        setTimeout(() => this.aosService.refresh(), 500);
      });

      this.primengConfig.ripple = true;
    }

  }
}
