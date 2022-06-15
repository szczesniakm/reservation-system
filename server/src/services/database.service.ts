import { inject, injectable } from "inversify";
import { DataSource } from "typeorm";
import { TYPES } from "../core/types.core";
import { Reservation } from "../entities/reservation.entity";
import { Logger } from "./logger.service";

@injectable()
export class DatabaseService {
    private static dataSource: DataSource;

    @inject(TYPES.Logger)
    private readonly logger: Logger;

    public async getDataSource(): Promise<DataSource> {
        if(DatabaseService.dataSource instanceof DataSource) {
            return DatabaseService.dataSource;
        }

        try {
            DatabaseService.dataSource = await new DataSource({
                type: 'sqlite',
                database: 'app.sqlite3',
                synchronize: true,
                logging: true,
                entities: [
                    Reservation
                ]
            }).initialize();
            this.logger.log('Database connection established.');
            return DatabaseService.dataSource;
        } catch (e) {
            this.logger.error('Could not establish database connection.');
            process.exit(1);
        }
    }

}