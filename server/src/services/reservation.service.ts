import { inject, injectable } from "inversify";
import { Host, Slot } from "../core/models";
import { TYPES } from "../core/types.core";
import { Reservation } from "../entities/reservation.entity";
import { BadRequestError, NotFoundError } from "../errors";
import { ReservationRepository } from "../repositories/reservation.repository";
import { AmtService } from "./amt.servicet";
import { HostService } from "./host.service";
import { Logger } from "./logger.service";

export interface AvaliableSlots {
    host: string;
    slots: Slot[]; 
}

@injectable()
export class ReservationService {
    @inject(TYPES.Logger)
    private readonly logger: Logger;
    
    @inject(TYPES.ReservationRepository) 
    private readonly reservationRepository: ReservationRepository;
    
    @inject(TYPES.HostService) 
    private readonly hostService: HostService;

    @inject(TYPES.AmtService)
    private readonly amtService: AmtService;

    public async create(username: string, hostname: string, start: Date, end: Date) {
        const host = await this.hostService.getHost(hostname);
            if(!host)
                throw new NotFoundError(`Nie znaleziono maszyny ${hostname}.`);

        const isUnavaliable = await this.reservationRepository.
            isHostAvalliableBetween(start, end, hostname);

        if(isUnavaliable.length)
            throw new BadRequestError(`${hostname} jest już zarezerwowany.`);

        const reservation = new Reservation(
            username, hostname, start, end
        );

        await this.reservationRepository.create(reservation);

        this.amtService.addReservation(reservation);
    }

    public async getAvaliableSlots(selectedHost?: string) {
        let reservations: Reservation[];
        if(selectedHost) {
            const host = await this.hostService.getHost(selectedHost);
            if(!host)
                throw new NotFoundError(`Nie znaleziono maszyny ${selectedHost}.`);

            reservations = [ ...await this.reservationRepository.getUpcomingReservationsByHost(host.name) ];
            return this.toSlots([host], reservations);
        }
        reservations = await this.reservationRepository.getUpcomingReservations();
        const hosts = await this.hostService.getAllHosts();

        return this.toSlots(hosts, reservations);
    }

    private toSlots(hosts: Host[], reservations: Reservation[]) {
        var grouped = reservations
            .sort(( {start: a}, {start: b} ) => a >= b ? 1 : -1)
            .reduce((grouped, reservation) => {
                var tmp = grouped.find(([ {host} ]) => host == reservation.host)
                if(!tmp) grouped.push(tmp = []);
                tmp.push(reservation);
                return grouped;
            }, []);

        let avaliableSlots = new Map<string, Slot[]>();
        
        hosts.forEach(host => {
            avaliableSlots.set(host.name, []);
        });
        
        for(let i = 0; i < grouped.length; i++) {
            const hostname = grouped[i][0].host
            avaliableSlots.set(hostname, []);
            if(grouped[i].length) {
                let res: Reservation = grouped[i][0];
                if(res.start > new Date()) {
                    avaliableSlots.get(hostname).push(new Slot(undefined, res));
                }
            }
            for(let j=1; j< grouped[i].length; j++) {
                avaliableSlots.get(hostname).push(new Slot(grouped[i][j-1], grouped[i][j]));
            }
            avaliableSlots.get(hostname).push(new Slot(grouped[i][grouped[i].length-1]));
        }

        avaliableSlots.forEach((slots: Slot[], host: string, map: Map<string, Slot[]>) => {
            if(slots.length == 0) {
                map.get(host).push(new Slot());
            }
        });

        let response: AvaliableSlots[] = [];

        avaliableSlots.forEach((slots: Slot[], host: string, map: Map<string, Slot[]>) => {
            let slot: AvaliableSlots = { host: host, slots: slots };
            response.push(slot);
        });

        return response;
    }

    public async extendReservation(id: number, end: Date): Promise<void> {
        let reservation = this.reservationRepository.getById(id);

        if (!reservation) {
            throw new NotFoundError(`Rezerwacja ${id} nie została znaleziona.`);
        } 

    }
}