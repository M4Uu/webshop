import { Component } from '@angular/core';
import { BgService } from '../../../global/bg-service/bg.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})

export class PageComponent {
  constructor(private bgService: BgService) {}

  ngOnInit() {
    this.bgService.setBackground('/image/bg-register.jpg');
  }
}
