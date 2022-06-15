import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
    constructor(username: string, host: string, start: Date, end: Date) {
        this.username = username;
        this.host = host;
        this.start = start;
        this.end = end;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 64 })
    public host: string;

    @Column('varchar', { length: 64 })
    public username: string;

    @Column()
    public start: Date;

    @Column()
    public end: Date;

}