import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private patientsRepository: Repository<Patient>,
    ) { }

    create(createPatientDto: CreatePatientDto) {
        return this.patientsRepository.save(this.patientsRepository.create(createPatientDto));
    }

    findAll() {
        return this.patientsRepository.find();
    }

    findOne(id: string) {
        return this.patientsRepository.findOne({ where: { id } });
    }

    update(id: string, updatePatientDto: UpdatePatientDto) {
        return this.patientsRepository.update(id, updatePatientDto);
    }

    remove(id: string) {
        return this.patientsRepository.delete(id);
    }
}
