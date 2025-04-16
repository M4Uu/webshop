import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-members-card',
  standalone: true,
  imports: [],
  templateUrl: './members-card.component.html',
  styleUrl: './members-card.component.scss'
})
export class MembersCardComponent {
  @Input() data: any;
}
