import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TestRequest } from '../../test-requests/entities/test-request.entity';

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    date_of_birth: Date;

    @Column()
    contact: string;

    @Column()
    gender: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => TestRequest, (testRequest) => testRequest.patient)
    testRequests: TestRequest[];
}
