import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('activity_logs')
export class ActivityLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    action_type: string;

    @Column({ type: 'text', nullable: true })
    details: string;

    @CreateDateColumn()
    timestamp: Date;
}
