import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ReferringDoctor } from './referring-doctor.entity';

@Entity('hospitals')
export class Hospital {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    contact_person: string;

    @OneToMany(() => ReferringDoctor, (doctor) => doctor.hospital)
    doctors: ReferringDoctor[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
