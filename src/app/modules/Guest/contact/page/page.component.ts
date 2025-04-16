import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  host: {
    'data-component': 'contact'
  },
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {

}
