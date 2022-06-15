import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, requestBody } from "inversify-express-utils";
import { JwtPayload, MakeReservationRequest } from "../core/models";
import { TYPES } from "../core/types.core";
import { Reservation } from "../entities/reservation.entity";
import { ReservationRepository } from "../repositories/reservation.repository";
import { Logger } from "../services/logger.service";
import { ReservationService } from "../services/reservation.service";

export interface AvaliableSlotsParams {
    host?: string;
}

@controller('/reservations', TYPES.AuthenticationMiddleware)
export class ReservationsController {
    @inject(TYPES.Logger) 
    private readonly logger: Logger;
    @inject(TYPES.ReservationRepository) 
    private readonly reservationRepository: ReservationRepository;

    @inject(TYPES.ReservationService) 
    private readonly reservationService: ReservationService;
    
    @httpGet('')
    public async getAllReservations(req: Request, res: Response) {
        const reservations = await this.reservationRepository.getAll();
        return reservations;
    }

    @httpGet('/byDate')
    public async getReservationByDate(req: Request, res: Response) {
        const start = req.query.from as string;
        const end = req.query.to as string;

        const reservations = await this.reservationRepository.getReservationsBetween(new Date(start), new Date(end));

        return reservations;
    }

    @httpGet('/avaliableSlots')
    public async getAvaliableSlots(req: Request<{}, {}, {}, AvaliableSlotsParams>, res: Response) {
        const host = req.query.host;
        return await this.reservationService.getAvaliableSlots(host);
    }

    @httpGet('/:reservationId')
    public async getReservation(req: Request, res: Response) {
        const reservationId = Number(req.query.reservationId ?? req.params.reservationId);
        const reservation = await this.reservationRepository.getById(reservationId);
        if(!reservation) {
            return res.status(404).send('reservation not found.')
        }
        return reservation;
    }

    @httpPost('')
    public async createReservation(
        @requestBody() 
        body: MakeReservationRequest,
        req: Request & { user: JwtPayload },
        res: Response
        ) {

        await this.reservationService.create(req.user.username, 
            body.host, 
            body.start ? new Date(body.start) : new Date(), 
            new Date(body.end));
        
        return res.status(201).send();
    }
}