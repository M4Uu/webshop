import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  host: {
    'data-component': 'members'
  },
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  members = [
    {
      name: 'José Palmera',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      img: '/assets/team/member1.jpg',
      social: {
        instagram: '#',
        linkedin: '#',
        email: '#',
        whatsapp: '#'
      }
    },
    {
      name: 'José Palmera',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      img: '/assets/team/member1.jpg',
      social: {
        instagram: '#',
        linkedin: '#',
        email: '#',
        whatsapp: '#'
      }
    },
    {
      name: 'José Palmera',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      img: '/assets/team/member1.jpg',
      social: {
        instagram: '#',
        linkedin: '#',
        email: '#',
        whatsapp: '#'
      }
    },
    {
      name: 'José Palmera',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      img: '/assets/team/member1.jpg',
      social: {
        instagram: '#',
        linkedin: '#',
        email: '#',
        whatsapp: '#'
      }
    },
  ];
}
