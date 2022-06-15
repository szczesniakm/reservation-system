import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AvaliableSlots, AvaliableSlotsParams, MakeReservationRequest, Reservation } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ReservationService implements OnInit {
  private readonly webApi = environment.webApi;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.webApi}/reservations`);
  }

  getAvaliableSlots(host?: string): Observable<AvaliableSlots[]> {
    if(host) {
      console.log(host);
      let params = new HttpParams()
        .set('host', host);

      return this.http.get<AvaliableSlots[]>(`${this.webApi}/reservations/avaliableSlots`, { params: params });
    }
    return this.http.get<AvaliableSlots[]>(`${this.webApi}/reservations/avaliableSlots`);
  }

  makeReservation(reservation: MakeReservationRequest): Observable<void> {
    console.log(reservation);
    return this.http.post<void>(`${this.webApi}/reservations/`, reservation);
  }
}
