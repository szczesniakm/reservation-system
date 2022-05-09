import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService implements OnInit {
  private readonly webApi = environment.webApi;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  getReservations(): Observable<Reservation[]> {
    console.log("sending request...");
    return this.http.get<Reservation[]>(`${this.webApi}/reservations`);
  }
}
