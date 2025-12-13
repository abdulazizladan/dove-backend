import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find({
            select: ['id', 'first_name', 'last_name', 'email', 'role', 'isActive', 'created_at', 'updated_at']
        });
    }

    async findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { id },
            select: ['id', 'first_name', 'last_name', 'email', 'role', 'isActive', 'created_at', 'updated_at']
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        // Explicitly select password for auth checks
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'first_name', 'last_name', 'email', 'password', 'role', 'isActive']
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password) {
            const salt = await bcrypt.genSalt();
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
        }
        return this.usersRepository.update(id, updateUserDto);
    }

    async remove(id: string) {
        return this.usersRepository.softDelete(id);
    }
}
