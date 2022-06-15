import { injectable } from "inversify";

@injectable()
export class Logger {
    public log(message: string): void {
        const time = new Date().toISOString();
        console.log(`${time} - INFO - ${message}`);
    }

    public error(message: string): void {
        const time = new Date().toISOString();
        console.error(`${time} - ERROR - ${message}`);
    }
}