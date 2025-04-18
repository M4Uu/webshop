import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

const routes: Routes = [
  {
    path: '',
    title: 'About',
    component: PageComponent
  }
];


@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CardModule,
    DialogModule,
  ]
})
export class AboutModule { }
