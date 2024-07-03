import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-to-home',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './to-home.component.html',
  styleUrl: './to-home.component.scss'
})
export class ToHomeComponent {
  constructor(private router: Router){}

  navigateToHome = () => {
    this.router.navigate(['/home'])
  }
}
