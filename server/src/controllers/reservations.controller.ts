import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, requestBody } from "inversify-express-utils";
import { JwtPayload, MakeReservationRequest } from "../core/models";
import { TYPES } from "../core/types.core";
import { Reservation } from "../entities/reservation.entity";
import { ReservationRepository } from "../repositories/reservation.repository";
import { Logger } from "../services/logger.service";

@controller('/reservations', TYPES.AuthenticationMiddleware)
export class ReservationsController {
    @inject(TYPES.Logger) 
    private readonly logger: Logger;
    @inject(TYPES.ReservationRepository) 
    private readonly reservationRepository: ReservationRepository;

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

        const reservation = new Reservation(
            req.user.username, 
            body.host, 
            body.start, 
            body.end);

        await this.reservationRepository.create(reservation);
        
        return res.sendStatus(201);
    }
}