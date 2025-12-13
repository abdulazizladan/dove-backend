import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { ApiBearerAuth, ApiTags, ApiBody, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('departments')
export class DepartmentController {
    constructor(private readonly service: DepartmentService) { }

    @Post()
    @ApiOperation({ summary: 'Create department', description: 'Create a new department' })
    @ApiBody({ type: CreateDepartmentDto })
    @ApiResponse({ status: 201, description: 'Department created successfully.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Roles(UserRole.ADMIN)
    create(@Body() body: CreateDepartmentDto) {
        return this.service.create(body);
    }

    @Get()
    @ApiOperation({ summary: 'List departments', description: 'Retrieve all departments' })
    @ApiResponse({ status: 200, description: 'List of departments returned.' })
    @Roles(UserRole.ADMIN, UserRole.STAFF)
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get department', description: 'Retrieve department by ID' })
    @ApiParam({ name: 'id', description: 'Department ID' })
    @ApiResponse({ status: 200, description: 'Department details returned.' })
    @ApiResponse({ status: 404, description: 'Department not found.' })
    @Roles(UserRole.ADMIN)
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update department', description: 'Update department details' })
    @ApiParam({ name: 'id', description: 'Department ID' })
    @ApiBody({ type: CreateDepartmentDto })
    @ApiResponse({ status: 200, description: 'Department updated successfully.' })
    @ApiResponse({ status: 404, description: 'Department not found.' })
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() body: UpdateDepartmentDto) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete department', description: 'Remove a department' })
    @ApiParam({ name: 'id', description: 'Department ID' })
    @ApiResponse({ status: 200, description: 'Department deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Department not found.' })
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
