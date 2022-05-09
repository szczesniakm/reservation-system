import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Host } from 'src/app/core/models/host';
import { Reservation } from 'src/app/core/models/reservation';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HostsService } from 'src/app/core/services/hosts.service';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-reservations-grid',
  templateUrl: './reservations-grid.component.html',
  styleUrls: ['./reservations-grid.component.scss']
})
export class ReservationsGridComponent implements OnInit {

  reservations?: Reservation[];
  hosts?: Host[];
  loggedIn: Observable<boolean>;

  constructor(private reservationsService: ReservationService,
    private hostsService: HostsService,
    private authService: AuthenticationService,
    private router: Router) { 
      this.loggedIn = authService.isAuthenticatedObservable();
     }

  async ngOnInit(): Promise<void> {
    this.hostsService.getHosts().subscribe({
      next: hosts => this.hosts = hosts,
      error: err => console.log(err)
    });
    this.reservationsService.getReservations().subscribe(
      data => this.reservations = data,
      err => console.log(err)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  } 

  async getHosts(): Promise<void> {
    
  }
}
