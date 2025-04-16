import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { MapComponent } from '../../../components/shared/map/map.component';

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    MapComponent
  ],
})
export class HomeModule { }
