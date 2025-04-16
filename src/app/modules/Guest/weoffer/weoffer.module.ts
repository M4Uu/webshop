import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { ButtonModule } from 'primeng/button';
import { MatIcon } from '@angular/material/icon';


@NgModule({
  declarations: [
    PageComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MatIcon
  ],
})
export class WeofferModule { }

