import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation, Os, Host, AvaliableSlots, MakeReservationRequest } from 'src/app/core/models/models';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HostsService } from 'src/app/core/services/hosts.service';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { ToastService } from 'src/app/core/services/toast.service';


@Component({
  selector: 'app-reservations-grid',
  templateUrl: './reservations-grid.component.html',
  styleUrls: ['./reservations-grid.component.scss']
})
export class ReservationsGridComponent implements OnInit {
  slots!: AvaliableSlots[];
  reservations!: Reservation[];
  hosts!: Host[];
  loggedIn: Observable<boolean>;
  osTypes: Os[] = [
    { name: 'Ubuntu' },
    { name: 'Arch Linux' },
    { name: 'Arch Linux Console' },
    { name: 'FreeBSD' },
  ]
  isLoadingSlots: boolean = false;
  slotListQuery!: Host;
  constructor(private reservationService: ReservationService,
    private hostsService: HostsService,
    private authService: AuthenticationService,
    private toastService: ToastService) {
      this.loggedIn = authService.isAuthenticatedObservable();
     }

  ngOnInit(): void {
    this.hostsService.getHosts().subscribe({
      next: hosts => {this.hosts = hosts; },
      error: err => console.log(err)
    });

    this.reservationService.getReservations().subscribe({
      next: data => this.reservations = data,
      error: err => console.log(err)
    });

  }

  updateSlots(host: Host) {
    this.slotListQuery = host;
    this.refresh();
  }

  refresh() {
    this.isLoadingSlots = true;
    this.reservationService.getAvaliableSlots(this.slotListQuery.host).subscribe({
      next: slots => this.slots = slots,
      error: err => console.log(err)
    }).add( () => this.isLoadingSlots = false );
  }

  makeReservation(event: MakeReservationRequest) {
    this.reservationService.makeReservation(event).subscribe({
      next: () => {
        this.toastService.success(`Pomyślnie zarezerwowano stację ${event.host}`);
        this.refresh();
      }
    });
  }
}
