import { Component, OnInit} from '@angular/core';
import { BgService } from '../../core/bg-service/bg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(
    private bgService: BgService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.bgService.setBackground('/image/bg-home.jpg');
  }

  products = [
    {},{},{},{},{},{},{}
  ]

  navigateRegister() {
    this.router.navigate(['/register'])
  }
  navigateLogin() {
    this.router.navigate(['/login'])
  }
}
