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
  public visible: boolean = false;
  public member: any = {title: '', img: '', content: ''};
  public showDialog(member: any) {
    this.visible = true
    this.member = member;
  }

  public textCards = [
    {title: 'Objetivos', content: 'Lorem ipsum dolor sit amet...'},
    {title: 'Misión', content: 'Lorem ipsum dolor sit amet...'},
    {title: 'Metas', content: 'Lorem ipsum dolor sit amet...'}
  ];

  teamMembers = [
    {title: "José Palmera", img: 'assets/images/test.webp', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eum animi officiis, reiciendis ipsam unde odio expedita a! Quasi, molestias accusamus alias possimus quod neque pariatur quaerat obcaecati a labore?'},
    {title: "José Palmera", img: 'assets/images/test.webp', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eum animi officiis, reiciendis ipsam unde odio expedita a! Quasi, molestias accusamus alias possimus quod neque pariatur quaerat obcaecati a labore?'},
    {title: "José Palmera", img: 'assets/images/test.webp', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eum animi officiis, reiciendis ipsam unde odio expedita a! Quasi, molestias accusamus alias possimus quod neque pariatur quaerat obcaecati a labore?'},
    {title: "José Palmera", img: 'assets/images/test.webp', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eum animi officiis, reiciendis ipsam unde odio expedita a! Quasi, molestias accusamus alias possimus quod neque pariatur quaerat obcaecati a labore?'},
  ];
}
