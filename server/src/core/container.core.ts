import { Container } from 'inversify';
import { Logger } from '../services/logger.service';
import { TYPES } from './types.core';
import { DatabaseService } from '../services/database.service';
import { ReservationRepository } from '../repositories/reservation.repository';

import '../controllers/reservations.controller';
import '../controllers/tokens.controller';
import '../controllers/hosts.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { HostService } from '../services/host.service';
import { ReservationService } from '../services/reservation.service';

export const container = new Container();
container.bind(TYPES.Logger).to(Logger);
container.bind(TYPES.DatabaseService).to(DatabaseService);
container.bind(TYPES.ReservationRepository).to(ReservationRepository);
container.bind(TYPES.AuthenticationMiddleware).to(AuthenticationMiddleware);
container.bind(TYPES.HostService).to(HostService);
container.bind(TYPES.ReservationService).to(ReservationService);