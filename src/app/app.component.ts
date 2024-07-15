import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { BgService } from './global/bg-service/bg.service';
import { isPlatformBrowser } from '@angular/common';


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

  private dummyContainer!: DocumentFragment;

  constructor(
    private bgService: BgService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();

      this.bgService.background$.subscribe((backgroundImage) => {
        document.body.style.backgroundImage = `url(${backgroundImage})`;
      });
    }

  }
}
