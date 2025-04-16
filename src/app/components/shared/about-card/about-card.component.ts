import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-card',
  standalone: true,
  imports: [],
  templateUrl: './about-card.component.html'
})
export class AboutCardComponent {
  @Input() data: any;
}
