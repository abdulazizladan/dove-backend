import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { TestRequest } from './test-request.entity';

@Entity('results')
export class Result {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    summary: string;

    @Column({ nullable: true })
    attachment: string;

    @OneToOne(() => TestRequest, (testRequest) => testRequest.result)
    @JoinColumn()
    testRequest: TestRequest;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
