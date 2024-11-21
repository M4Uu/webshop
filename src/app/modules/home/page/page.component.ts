import { Component, inject, OnInit} from '@angular/core';
import { BgService } from '../../../global/bg-service/bg.service';
import { Router } from '@angular/router';
import { LoggedService } from '../../../core/services/loggedUser/logged.service';

@Component({
  selector: 'app-home',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit{
  bgService = inject(BgService)
  router = inject(Router)
  logged = inject(LoggedService)

  ngOnInit() {
    this.logged.ViewUserLogged()
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
