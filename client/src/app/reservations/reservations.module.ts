import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsGridComponent } from './reservations-grid/reservations-grid.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    ReservationsGridComponent
  ],
  exports: [
    ReservationsGridComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
  ]
})
export class ReservationsModule { }
