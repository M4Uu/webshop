import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  host: {
    'data-component': 'about'
  },
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  textCards = [
    {title: 'Objetivos', content: 'Lorem ipsum dolor sit amet...'},
    {title: 'Misión', content: 'Lorem ipsum dolor sit amet...'},
    {title: 'Metas', content: 'Lorem ipsum dolor sit amet...'}
  ];

  teamMembers = [
    {title: "José Palmera"},
    {title: "José Palmera"},
    {title: "José Palmera"},
    {title: "José Palmera"}
  ];
}
