import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { AboutCardComponent } from '../../../components/shared/about-card/about-card.component';
import { MembersCardComponent } from '../../../components/shared/members-card/members-card.component';



@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    MembersCardComponent,
    AboutCardComponent,
  ]
})
export class AboutModule { }
