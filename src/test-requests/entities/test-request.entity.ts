import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TestRequestStatus } from '../enums/test-request-status.enum';
import { Test } from './test.entity';
import { Payment } from './payment.entity';
import { Patient } from '../../patients/entities/patient.entity';

@Entity('test_requests')
export class TestRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Patient, (patient) => patient.testRequests)
    @JoinColumn({ name: 'patientId' })
    patient: Patient;

    @Column({ nullable: true })
    patientId: string;

    @ManyToOne(() => Test)
    test: Test;

    @OneToMany(() => Payment, (payment) => payment.testRequest, { cascade: true })
    payments: Payment[];

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    discount: number;

    @Column({ nullable: true })
    discount_reason: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    outstanding_balance: number;

    @Column({
        type: 'simple-enum',
        enum: TestRequestStatus,
        default: TestRequestStatus.PENDING,
    })
    status: TestRequestStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
