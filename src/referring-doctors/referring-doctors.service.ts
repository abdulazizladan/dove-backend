import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './entities/hospital.entity';
import { ReferringDoctor } from './entities/referring-doctor.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { CreateReferringDoctorDto } from './dto/create-referring-doctor.dto';

@Injectable()
export class ReferringDoctorsService {
    constructor(
        @InjectRepository(Hospital)
        private hospitalRepository: Repository<Hospital>,
        @InjectRepository(ReferringDoctor)
        private referringDoctorRepository: Repository<ReferringDoctor>,
    ) { }

    // Hospital Methods
    async createHospital(createHospitalDto: CreateHospitalDto): Promise<Hospital> {
        const hospital = this.hospitalRepository.create(createHospitalDto);
        return this.hospitalRepository.save(hospital);
    }

    async findAllHospitals(): Promise<Hospital[]> {
        return this.hospitalRepository.find({ relations: ['doctors'] });
    }

    async findOneHospital(id: string): Promise<Hospital | null> {
        return this.hospitalRepository.findOne({ where: { id }, relations: ['doctors'] });
    }

    // Referring Doctor Methods
    async createDoctor(createReferringDoctorDto: CreateReferringDoctorDto): Promise<ReferringDoctor> {
        const doctor = this.referringDoctorRepository.create(createReferringDoctorDto);
        return this.referringDoctorRepository.save(doctor);
    }

    async findAllDoctors(): Promise<ReferringDoctor[]> {
        return this.referringDoctorRepository.find({ relations: ['hospital'] });
    }

    async findOneDoctor(id: string): Promise<ReferringDoctor | null> {
        return this.referringDoctorRepository.findOne({ where: { id }, relations: ['hospital'] });
    }
}
