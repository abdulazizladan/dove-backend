import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { ApiBearerAuth, ApiTags, ApiBody, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { CreateDesignationDto } from './dto/create-designation.dto';

@ApiTags('designations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('designations')
export class DesignationController {
    constructor(private readonly service: DesignationService) { }

    @Post()
    @ApiOperation({ summary: 'Create designation', description: 'Create a new designation' })
    @ApiBody({ type: CreateDesignationDto })
    @ApiResponse({ status: 201, description: 'Designation created successfully.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    create(@Body() body: CreateDesignationDto) {
        return this.service.create(body.name);
    }

    @Get()
    @ApiOperation({ summary: 'List designations', description: 'Retrieve all designations' })
    @ApiResponse({ status: 200, description: 'List of designations returned.' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get designation', description: 'Retrieve designation by ID' })
    @ApiParam({ name: 'id', description: 'Designation ID' })
    @ApiResponse({ status: 200, description: 'Designation details returned.' })
    @ApiResponse({ status: 404, description: 'Designation not found.' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update designation', description: 'Update designation details' })
    @ApiParam({ name: 'id', description: 'Designation ID' })
    @ApiBody({ type: CreateDesignationDto })
    @ApiResponse({ status: 200, description: 'Designation updated successfully.' })
    @ApiResponse({ status: 404, description: 'Designation not found.' })
    update(@Param('id') id: string, @Body() body: CreateDesignationDto) {
        return this.service.update(id, body.name);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete designation', description: 'Remove a designation' })
    @ApiParam({ name: 'id', description: 'Designation ID' })
    @ApiResponse({ status: 200, description: 'Designation deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Designation not found.' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
