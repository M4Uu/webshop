import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FacturaComponent } from '@app/components/shared/factura/factura.component';

const routes: Routes = [
  {
    path: '',
    title: 'Historial de Ventas',
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
    TableModule,
    TooltipModule,
    FloatLabelModule,
    ButtonModule,
    FormsModule,
    InputText,
    DatePickerModule,
    DialogModule,
    FacturaComponent
  ]
})
export class VentasModule { }
