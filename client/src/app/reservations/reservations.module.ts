import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsGridComponent } from './reservations-grid/reservations-grid.component';
import { CoreModule } from '../core/core.module';
import { SearchAvaliableHostsComponent } from './search-avaliable-hosts/search-avaliable-hosts.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { SlotListComponent } from './slot-list/slot-list.component';
import {CardModule} from 'primeng/card';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    ReservationsGridComponent,
    SearchAvaliableHostsComponent,
    SlotListComponent
  ],
  exports: [
    ReservationsGridComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    CalendarModule
  ]
})
export class ReservationsModule { }
