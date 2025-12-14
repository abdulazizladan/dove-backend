import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferringDoctorsService } from './referring-doctors.service';
import { ReferringDoctorsController } from './referring-doctors.controller';
import { Hospital } from './entities/hospital.entity';
import { ReferringDoctor } from './entities/referring-doctor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Hospital, ReferringDoctor])],
    controllers: [ReferringDoctorsController],
    providers: [ReferringDoctorsService],
    exports: [ReferringDoctorsService],
})
export class ReferringDoctorsModule { }
