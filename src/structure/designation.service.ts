import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Designation } from './entities/designation.entity';

@Injectable()
export class DesignationService {
    constructor(
        @InjectRepository(Designation)
        private repo: Repository<Designation>,
    ) { }

    create(name: string) {
        return this.repo.save(this.repo.create({ name }));
    }

    findAll() {
        return this.repo.find();
    }

    findOne(id: string) {
        return this.repo.findOne({ where: { id } });
    }

    update(id: string, name: string) {
        return this.repo.update(id, { name });
    }

    remove(id: string) {
        return this.repo.delete(id);
    }
}
