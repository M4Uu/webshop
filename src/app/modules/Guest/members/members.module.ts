import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { MatIcon } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Members',
    component: PageComponent
  }
];


@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    MatIcon,
    RouterModule.forChild(routes)
  ]
})
export class MembersModule { }
