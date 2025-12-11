import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('organization')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) { }

    @Post()
    @ApiOperation({ summary: 'Create organization', description: 'Register a new organization' })
    @ApiResponse({ status: 201, description: 'Organization created successfully.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    create(@Body() createOrganizationDto: CreateOrganizationDto) {
        return this.organizationService.create(createOrganizationDto);
    }

    @Get()
    @ApiOperation({ summary: 'List organizations', description: 'Retrieve all organizations' })
    @ApiResponse({ status: 200, description: 'List of organizations returned.' })
    findAll() {
        return this.organizationService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get organization', description: 'Retrieve organization details by ID' })
    @ApiParam({ name: 'id', description: 'Organization ID' })
    @ApiResponse({ status: 200, description: 'Organization details returned.' })
    @ApiResponse({ status: 404, description: 'Organization not found.' })
    findOne(@Param('id') id: string) {
        return this.organizationService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update organization', description: 'Update organization details' })
    @ApiParam({ name: 'id', description: 'Organization ID' })
    @ApiResponse({ status: 200, description: 'Organization updated successfully.' })
    @ApiResponse({ status: 404, description: 'Organization not found.' })
    update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
        return this.organizationService.update(id, updateOrganizationDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete organization', description: 'Remove an organization' })
    @ApiParam({ name: 'id', description: 'Organization ID' })
    @ApiResponse({ status: 200, description: 'Organization deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Organization not found.' })
    remove(@Param('id') id: string) {
        return this.organizationService.remove(id);
    }
}
