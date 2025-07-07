import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AosService } from './global/aos-service/aosservice.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToastModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'webshop';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private aosService: AosService,
  ) { }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.aosService.init();

      window.addEventListener('load', () => {
        setTimeout(() => this.aosService.refresh(), 500);
      });

    }

  }
}
