import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LabTestsService } from './lab-tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('tests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tests')
export class LabTestsController {
    constructor(private readonly testsService: LabTestsService) { }

    @Post()
    @Roles(UserRole.ADMIN, UserRole.STAFF)
    @ApiOperation({ summary: 'Create a new test', description: 'Add a new test to the catalog (Admin/Manager only)' })
    @ApiResponse({ status: 201, description: 'Test created successfully.' })
    create(@Body() createTestDto: CreateTestDto) {
        return this.testsService.create(createTestDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all tests', description: 'Retrieve the test catalog' })
    @ApiResponse({ status: 200, description: 'List of tests returned.' })
    findAll() {
        return this.testsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a test', description: 'Retrieve details of a specific test' })
    @ApiParam({ name: 'id', description: 'Test ID' })
    @ApiResponse({ status: 200, description: 'Test details returned.' })
    findOne(@Param('id') id: string) {
        return this.testsService.findOne(id);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update a test', description: 'Update test catalog details' })
    @ApiParam({ name: 'id', description: 'Test ID' })
    @ApiResponse({ status: 200, description: 'Test updated successfully.' })
    update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
        return this.testsService.update(id, updateTestDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Delete a test', description: 'Remove a test from the catalog' })
    @ApiParam({ name: 'id', description: 'Test ID' })
    @ApiResponse({ status: 200, description: 'Test deleted successfully.' })
    remove(@Param('id') id: string) {
        return this.testsService.remove(id);
    }
}
