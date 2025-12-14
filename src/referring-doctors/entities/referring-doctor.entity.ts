import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Hospital } from './hospital.entity';

@Entity('referring_doctors')
export class ReferringDoctor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    @ManyToOne(() => Hospital, (hospital) => hospital.doctors, { nullable: true })
    @JoinColumn({ name: 'hospitalId' })
    hospital: Hospital;

    @Column({ nullable: true })
    hospitalId: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
