import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { CardComponent } from '../../components/molecules/card/card.component';
import { BgService } from '../../global/bg-service/bg.service';
import { PageComponent } from './page/page.component';
import { HeaderComponent } from '../../components/common/header/header.component';
import { FooterComponent } from '../../components/common/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PageComponent
  ],
  providers: [
    BgService
  ],
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    CarouselModule,
    CardComponent,
    RouterModule,
  ],
  exports: [PageComponent]
})
export class HomeModule { }
