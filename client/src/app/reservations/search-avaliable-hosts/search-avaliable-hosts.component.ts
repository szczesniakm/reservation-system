import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AvaliableSlotsParams, Host } from 'src/app/core/models/models';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-search-avaliable-hosts',
  templateUrl: './search-avaliable-hosts.component.html',
  styleUrls: ['./search-avaliable-hosts.component.scss']
})
export class SearchAvaliableHostsComponent implements OnChanges {

  @Input() allHosts: Host[] = [];
  @Output() onSearchSubmit = new EventEmitter();

  params!: AvaliableSlotsParams;
  filteredHosts!: Host[];
  searchAvaliableForm = new FormGroup({
    host: new FormControl(''),
  });

  @Input()
  isFetching: boolean = false;
  constructor() {
    this.filteredHosts = {...this.allHosts};
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const chngs = changes['allHosts'];
    // this.allHosts = chngs.currentValue;
  }

  searchHosts(ev: any) {
    this.filteredHosts = this.allHosts.filter( h => h.host.includes(ev) );
  }

  selected() {
    this.searchAvaliableForm.controls['host'].markAsUntouched();
    this.searchAvaliableForm.controls['host'].markAsTouched();
  }

  searchForAvaliableHosts() {
    this.isFetching = true;
    let host = this.searchAvaliableForm.controls['host']?.value || '';
    this.onSearchSubmit.emit(host);
  }
}
