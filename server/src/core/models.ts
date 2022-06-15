import { Reservation } from "../entities/reservation.entity";

export interface JwtPayload {
    username: string;
    role: string;
}

export interface MakeReservationRequest {
    host: string;
    start?: Date;
    end: Date;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface Host {
    name: string;
    status: HostStatus;
}

export type HostStatus = 'Dostępny' | 'Zajęty' | 'Niedostępny';

export class Slot {
    from: Date;
    to: Date;

    constructor(reservation?: Reservation, next?: Reservation) {
        if(reservation === undefined && next === undefined) {
            this.from = new Date();
            this.to = new Date(8640000000000000);
        } else if (next === undefined) {
            this.from = reservation.end;
            this.to = new Date(8640000000000000);
        }  else if (reservation === undefined) {
            this.from = new Date();
            this.to = next.start;
        } else {
            this.from = reservation.end;
            this.to = next.start;
        }
    }
}