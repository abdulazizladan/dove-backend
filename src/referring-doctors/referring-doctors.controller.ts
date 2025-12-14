import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReferringDoctorsService } from './referring-doctors.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { CreateReferringDoctorDto } from './dto/create-referring-doctor.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Referring Doctors')
@Controller('referring-doctors')
export class ReferringDoctorsController {
    constructor(private readonly referringDoctorsService: ReferringDoctorsService) { }

    @Post('hospitals')
    @ApiOperation({ summary: 'Create a new hospital' })
    createHospital(@Body() createHospitalDto: CreateHospitalDto) {
        return this.referringDoctorsService.createHospital(createHospitalDto);
    }

    @Get('hospitals')
    @ApiOperation({ summary: 'Get all hospitals' })
    findAllHospitals() {
        return this.referringDoctorsService.findAllHospitals();
    }

    @Get('hospitals/:id')
    @ApiOperation({ summary: 'Get a hospital by ID' })
    findOneHospital(@Param('id') id: string) {
        return this.referringDoctorsService.findOneHospital(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new referring doctor' })
    createDoctor(@Body() createReferringDoctorDto: CreateReferringDoctorDto) {
        return this.referringDoctorsService.createDoctor(createReferringDoctorDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all referring doctors' })
    findAllDoctors() {
        return this.referringDoctorsService.findAllDoctors();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a referring doctor by ID' })
    findOneDoctor(@Param('id') id: string) {
        return this.referringDoctorsService.findOneDoctor(id);
    }
}
