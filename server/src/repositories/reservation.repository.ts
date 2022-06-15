import { inject, injectable } from "inversify";
import { Between, LessThan, MoreThan, Repository } from "typeorm";
import { TYPES } from "../core/types.core";
import { Reservation } from "../entities/reservation.entity";
import { DatabaseService } from "../services/database.service";
import { Logger } from "../services/logger.service";

@injectable()
export class ReservationRepository {
    @inject(TYPES.Logger) private readonly logger: Logger;
    private readonly dbService: DatabaseService;
    
    constructor(@inject(TYPES.DatabaseService) dbService: DatabaseService) {
        this.dbService = dbService;
    }

    public async getById(id: number) {
        const repo = await this.getRepository();
        return repo.findOne({
            where: {
                id: id
            }
        })
    }
    
    public async getByHost(host: string): Promise<Reservation[]> {
        const repo = await this.getRepository();
        return repo.find({
            where: {
                host: host
            }
        })
    }

    public async getAll() {
        const repo = await this.getRepository();
        return repo.find();
    }

    public async getUpcomingReservations(): Promise<Reservation[]> {
        const repo = await this.getRepository();
        return repo.find({
            where: {
                end: MoreThan(new Date())
            }
        });
    }

    public async getUpcomingReservationsByHost(host: string): Promise<Reservation[]> {
        const repo = await this.getRepository();
        return repo.find({
            where: {
                end: MoreThan(new Date()),
                host: host
            }, 
        });
    }


    public async getReservationsBetween(start: Date, end: Date) {
        const repo = await this.getRepository();
        const filter = Between(start, end);

        return repo.find({
            where: [
                { start: filter },
                { end: filter }
            ]
        });
    }

    public async isHostAvalliableBetween(start: Date, end: Date, host: string) {
        const repo = await this.getRepository();
        const filter = Between(start, end);
        
        return repo.find({
            where: [
                { host: host, start: filter },
                { host: host, end: filter },
                { host: host, start: LessThan(start), end: MoreThan(start) }
            ]
        });
    }

    public async create(reservation: Reservation): Promise<void> {
        const repo = await this.getRepository();
        await repo.save(reservation);
        this.logger.log(`Succesfully created reservation (${reservation.id})`);
    }

    private async getRepository(): Promise<Repository<Reservation>> {
        const dataSource = await this.dbService.getDataSource();
        return dataSource.getRepository(Reservation);
    }
}