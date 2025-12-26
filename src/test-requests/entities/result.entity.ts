import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { TestRequest } from './test-request.entity';
import { User } from '../../users/entities/user.entity';

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

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'uploadedById' })
    uploadedBy: User;

    @Column({ nullable: true })
    uploadedById: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
