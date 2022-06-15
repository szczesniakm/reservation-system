import { injectable } from "inversify";
import { Reservation } from "../entities/reservation.entity";
import * as schedule from 'node-schedule';
@injectable()
export class AmtService {
    
    private map: Map<Reservation, schedule.Job[]> = new Map();

    constructor() {}

    public addReservation(reservation: Reservation): void {
        let powerOnDate = reservation.start;
        let powerOffDate = reservation.end;
        
        const powerOn = schedule.scheduleJob("powerOn", powerOnDate, () => this.powerOn(reservation.host));        
        const powerOff = schedule.scheduleJob("powerOff", powerOffDate, () => this.powerOff(reservation.host));

        console.log(powerOn);
        this.map.set(reservation, [powerOn, powerOff]);
    }

    private async powerOn(host: string): Promise<void> {
        console.log(`Host ${host} starting...`);
    }

    private async powerOff(host: string): Promise<void> {
        console.log(`Host ${host} stopping...`);
    }
}