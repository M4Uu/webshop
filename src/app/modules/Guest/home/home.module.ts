import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { MapComponent } from '@shared/map/map.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: PageComponent
  }
];

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    MapComponent,
    RouterModule.forChild(routes) // Importante para rutas hijas
  ],
})
export class HomeModule { }
