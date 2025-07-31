import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  host: {
    'data-component': 'about'
  },
  standalone: false,
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  public visible: boolean = false;
  public member: any = { title: '', img: '', content: '' };
  public showDialog(member: any) {
    this.visible = true
    this.member = member;
  }

  public textCards = [
    { title: 'Objetivos', content: 'Fabricación y distribución de joyas artesanales, como también la venta de otros productos tales como ropa accesorios y artículos de cuidado personal.' },
    { title: 'Misión', content: 'Establecerse como una empresa de lucro, encargada de diseñar, crear y comercializar joyería artesanal a nivel nacional e internacional.' },
    { title: 'Metas', content: 'Producir joyería con materiales preciosos, promoviendo el desarrollo de nuevos artesanos en la zona, siendo un referente en la cultura comercial para mantener la creación de arte en productos de joyería.' }
  ];

  teamMembers = [
    { title: "José Palmera", img: 'assets/images/test.webp', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eum animi officiis, reiciendis ipsam unde odio expedita a! Quasi, molestias accusamus alias possimus quod neque pariatur quaerat obcaecati a labore?' },
    { title: "José Palmera", img: 'assets/images/test.webp', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eum animi officiis, reiciendis ipsam unde odio expedita a! Quasi, molestias accusamus alias possimus quod neque pariatur quaerat obcaecati a labore?' },
    { title: "José Palmera", img: 'assets/images/test.webp', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eum animi officiis, reiciendis ipsam unde odio expedita a! Quasi, molestias accusamus alias possimus quod neque pariatur quaerat obcaecati a labore?' },
    { title: "José Palmera", img: 'assets/images/test.webp', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eum animi officiis, reiciendis ipsam unde odio expedita a! Quasi, molestias accusamus alias possimus quod neque pariatur quaerat obcaecati a labore?' },
  ];
}
