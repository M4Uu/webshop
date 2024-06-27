import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';

import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';

import { BgService } from './core/bg-service/bg.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'test-pnpm';

  constructor(private bgService: BgService) {}
  ngOnInit() {
    AOS.init();

    this.bgService.background$.subscribe((backgroundImage) => {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
    });
  }
}
