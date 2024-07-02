import { Component, OnInit } from '@angular/core';
import { BgService } from '../../core/bg-service/bg.service';
import { LoginFormComponent } from './login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  constructor(private bgService: BgService) {}

  ngOnInit() {
    this.bgService.setBackground('/image/bg-login.jpg');
  }
}
