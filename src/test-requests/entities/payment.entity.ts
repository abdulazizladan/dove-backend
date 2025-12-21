import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { TestRequest } from './test-request.entity';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ nullable: true })
    mode: string;

    @CreateDateColumn()
    payment_date: Date;

    @ManyToOne(() => TestRequest, (testRequest) => testRequest.payments)
    testRequest: TestRequest;
}
