import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { ButtonModule } from 'primeng/button';
import { MatIcon } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'We Offer',
    component: PageComponent
  }
];

@NgModule({
  declarations: [
    PageComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MatIcon,
    RouterModule.forChild(routes)
  ],
})
export class WeofferModule { }

