import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.STAFF, UserRole.RECEPTIONIST)
@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) { }

    @Post()
    @ApiOperation({ summary: 'Register patient', description: 'Register a new patient' })
    @ApiResponse({ status: 201, description: 'Patient registered successfully.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    create(@Body() createPatientDto: CreatePatientDto) {
        return this.patientsService.create(createPatientDto);
    }

    @Get()
    @ApiOperation({ summary: 'List patients', description: 'Retrieve all patients' })
    @ApiResponse({ status: 200, description: 'List of patients returned.' })
    findAll() {
        return this.patientsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get patient', description: 'Retrieve patient details by ID' })
    @ApiParam({ name: 'id', description: 'Patient ID' })
    @ApiResponse({ status: 200, description: 'Patient details returned.' })
    @ApiResponse({ status: 404, description: 'Patient not found.' })
    findOne(@Param('id') id: string) {
        return this.patientsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update patient', description: 'Update patient details' })
    @ApiParam({ name: 'id', description: 'Patient ID' })
    @ApiResponse({ status: 200, description: 'Patient updated successfully.' })
    @ApiResponse({ status: 404, description: 'Patient not found.' })
    update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
        return this.patientsService.update(id, updatePatientDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete patient', description: 'Remove a patient record' })
    @ApiParam({ name: 'id', description: 'Patient ID' })
    @ApiResponse({ status: 200, description: 'Patient deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Patient not found.' })
    remove(@Param('id') id: string) {
        return this.patientsService.remove(id);
    }
}
