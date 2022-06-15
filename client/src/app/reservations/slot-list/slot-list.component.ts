import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Slot, Host, AvaliableSlots, SelectedSlot, MakeReservationRequest } from 'src/app/core/models/models';


@Component({
  selector: 'app-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.scss']
})
export class SlotListComponent implements OnInit {

  @Input() slots!: AvaliableSlots[];
  @Output() onReservationSubmit = new EventEmitter();

  reservationForm: FormGroup = new FormGroup({
    start: new FormControl(''),
    end: new FormControl('', Validators.required),
    host: new FormControl('', Validators.required)
  });

  selectedSlot!: Slot;
  selectedHost!: string;
  minDate!: Date;
  maxDate!: Date;

  constructor() { }

  ngOnInit(): void {
    this.minDate = new Date()
    this.maxDate = new Date();
  }

  selectSlot(host: string, slot: Slot) {
    let start = new Date(slot.from);
    let end = new Date(slot.to)
    if(end.getTime() - start.getTime() > 8 * 60 * 60 * 1000) {
      end = new Date(start.getTime() + 8 * 60 * 60 * 1000);
    }
    console.log(slot, start, end);
    this.selectedSlot = slot;
    this.selectedHost = host;
    this.reservationForm.controls['start'].setValue(start);
    this.reservationForm.controls['end'].setValue(end);
    this.reservationForm.controls['host'].setValue(host);

    this.minDate = start;
    this.maxDate = end;
  }

  makeReservation() {
    if (this.reservationForm.valid) {
      this.onReservationSubmit.emit(this.reservationForm.value);
    }
  }
}
