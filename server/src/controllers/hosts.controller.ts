import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { TYPES } from "../core/types.core";
import { Logger } from "../services/logger.service";

@controller('/hosts', TYPES.AuthenticationMiddleware)
export class HostsController {
    @inject(TYPES.Logger) 
    private readonly logger: Logger;

    @httpGet('')
    public async getHosts(req: Request, res: Response) {
        const hosts = [
            { host: 's1', status: 'dostępny'},
            { host: 's2', status: 'dostępny'},
            { host: 's3', status: 'dostępny'},
            { host: 's4', status: 'dostępny'},
            { host: 's5', status: 'dostępny'},
            { host: 's6', status: 'dostępny'},
        ];

        return hosts;
    }
}