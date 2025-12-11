import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Test } from '../test-requests/entities/test.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Department } from '../structure/entities/department.entity';

@Injectable()
export class LabTestsService {
    constructor(
        @InjectRepository(Test)
        private repo: Repository<Test>,
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) { }

    async create(createTestDto: CreateTestDto) {
        const department = await this.entityManager.findOne(Department, { where: { id: createTestDto.departmentId } });
        if (!department) throw new NotFoundException('Department not found');

        const test = this.repo.create({
            ...createTestDto,
            department,
        });
        return this.repo.save(test);
    }

    findAll() {
        return this.repo.find({ relations: ['department'] });
    }

    findOne(id: string) {
        return this.repo.findOne({ where: { id }, relations: ['department'] });
    }

    update(id: string, updateTestDto: UpdateTestDto) {
        return this.repo.update(id, updateTestDto);
    }

    remove(id: string) {
        return this.repo.delete(id);
    }
}
