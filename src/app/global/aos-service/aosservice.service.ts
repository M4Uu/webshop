// services/aos.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';

@Injectable({ providedIn: 'root' })
export class AosService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  init() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        startEvent: 'load',
      });
    }
  }

  refresh() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }
}
