import { Component } from '@angular/core';
import { BgService } from '../../../core/bg-service/bg.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class RegisterComponent {
  constructor(private bgService: BgService) {}

  ngOnInit() {
    this.bgService.setBackground('/image/bg-register.jpg');
  }
}
