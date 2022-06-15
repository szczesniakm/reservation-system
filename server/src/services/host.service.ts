import { inject, injectable } from "inversify";
import { Host } from "../core/models";
import { TYPES } from "../core/types.core";
import { Logger } from "./logger.service";

@injectable()
export class HostService {
    private readonly hosts: Host[] = [
        { name: 's1', status: 'Dostępny' },
        { name: 's2', status: 'Dostępny' },
        { name: 's3', status: 'Dostępny' },
        { name: 's4', status: 'Dostępny' },
        { name: 's5', status: 'Dostępny' },
        { name: 's6', status: 'Dostępny' },
        { name: 's7', status: 'Dostępny' },
        { name: 's8', status: 'Dostępny' },
        { name: 's9', status: 'Dostępny' },
        { name: 'sa', status: 'Dostępny' },
        { name: 'sb', status: 'Dostępny' },
        { name: 'sc', status: 'Dostępny' },
        { name: 'sd', status: 'Dostępny' },
    ]


    @inject(TYPES.Logger)
    private readonly logger: Logger;
    
    public async getAllHosts(): Promise<Host[]> {
        return new Promise( (res, rej) => {
            res(this.hosts);
        });
    }

    public async getHost(name: string): Promise<Host> {
        return new Promise( (res, rej) => {
            let host = this.hosts.find(h => h.name == name);
            res(host);
        });

    }
}