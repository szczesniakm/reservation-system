import { HttpParams } from "@angular/common/http";

export type LoginRequest = {
    username: string,
    password: string
}

export interface Host {
  host: string;
  status: string;
}

export interface JWTPayload {
  username: string;
  role: string;
  iat: string;
  exp: string;
  iss: string;
}

export interface Os {
  name: string
}

export interface Reservation {
  id: string;
  host: string;
  username: string;
  start: Date;
  end: Date;
}

export interface AvaliableSlotsParams extends HttpParams {
  host?: string
}

export interface Slot {
  from: Date;
  to: Date;
}

export interface AvaliableSlots {
  host: string;
  slots: Slot[];
}

export interface SelectedSlot {
  host: string;
  slot: Slot;
}

export interface MakeReservationRequest {
  host: string;
  start: Date;
  end: Date;
}
