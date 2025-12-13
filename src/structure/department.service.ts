import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { OrganizationService } from '../organization/organization.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private repo: Repository<Department>,
        private organizationService: OrganizationService,
    ) { }

    async create(createDepartmentDto: CreateDepartmentDto) {
        const organization = await this.organizationService.findOne(createDepartmentDto.organizationId);
        if (!organization) {
            throw new NotFoundException('Organization not found');
        }
        const department = this.repo.create(createDepartmentDto);
        department.organization = organization;
        return this.repo.save(department);
    }

    findAll() {
        return this.repo.find({ relations: ['organization'] });
    }

    findOne(id: string) {
        return this.repo.findOne({ where: { id }, relations: ['organization'] });
    }

    update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
        return this.repo.update(id, updateDepartmentDto);
    }

    remove(id: string) {
        return this.repo.delete(id);
    }
}
