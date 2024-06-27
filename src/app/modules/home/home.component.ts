import { Component, OnInit} from '@angular/core';
import { BgService } from '../../core/bg-service/bg.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private bgService: BgService) {}

  ngOnInit() {
    this.bgService.setBackground('/image/bg-home.jpg');
  }

  products = [
    {},{},{},{},{},{},{}
  ]
}
