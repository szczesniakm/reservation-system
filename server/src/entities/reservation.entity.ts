import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
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