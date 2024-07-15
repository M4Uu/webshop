import { Component, OnInit } from '@angular/core';
import { BgService } from '../../../global/bg-service/bg.service';

@Component({
  selector: 'app-login',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class LoginComponent implements OnInit{
  constructor(private bgService: BgService) {}

  ngOnInit() {
    this.bgService.setBackground('/image/bg-login.jpg');
  }
}
