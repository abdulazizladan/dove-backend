import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Designation } from '../../structure/entities/designation.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({
        type: 'simple-enum',
        enum: UserRole,
        default: UserRole.STAFF,
    })
    role: UserRole;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Designation, (designation) => designation.users, { nullable: true })
    @JoinColumn({ name: 'designationId' })
    designation: Designation;

    @Column({ nullable: true })
    designationId: string;
}
