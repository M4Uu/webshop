import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { CardComponent } from '../../components/molecules/card/card.component';
import { BgService } from '../../core/bg-service/bg.service';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  providers: [
    BgService
  ],
  imports: [
    CommonModule,
    CarouselModule,
    CardComponent,
  ]
})
export class HomeModule { }
