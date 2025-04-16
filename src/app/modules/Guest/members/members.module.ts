import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { MatIcon } from '@angular/material/icon';



@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    MatIcon
  ]
})
export class MembersModule { }
