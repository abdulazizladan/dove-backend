import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TestRequestsService } from './test-requests.service';
import { CreateTestRequestDto } from './dto/create-test-request.dto';
import { UpdateTestRequestDto } from './dto/update-test-request.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('test-requests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.STAFF)
@Controller('test-requests')
export class TestRequestsController {
    constructor(private readonly service: TestRequestsService) { }

    @Post()
    @ApiOperation({ summary: 'Create test request', description: 'Submit a new test request for a patient' })
    @ApiResponse({ status: 201, description: 'Test request created successfully.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    create(@Body() createTestRequestDto: CreateTestRequestDto) {
        return this.service.create(createTestRequestDto);
    }

    @Post(':id/payment')
    @ApiOperation({ summary: 'Add payment to test request', description: 'Record a payment for a specific test request' })
    @ApiParam({ name: 'id', description: 'Test Request ID' })
    @ApiResponse({ status: 200, description: 'Payment added successfully.' })
    @ApiResponse({ status: 404, description: 'Test request not found.' })
    addPayment(@Param('id') id: string, @Body() createPaymentDto: CreatePaymentDto) {
        return this.service.addPayment(id, createPaymentDto.amount);
    }

    @Get()
    @ApiOperation({ summary: 'List test requests', description: 'Retrieve all test requests' })
    @ApiResponse({ status: 200, description: 'List of test requests returned.' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get test request', description: 'Retrieve test request details by ID' })
    @ApiParam({ name: 'id', description: 'Test Request ID' })
    @ApiResponse({ status: 200, description: 'Test request details returned.' })
    @ApiResponse({ status: 404, description: 'Test request not found.' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update test request', description: 'Update test request status or details' })
    @ApiParam({ name: 'id', description: 'Test Request ID' })
    @ApiResponse({ status: 200, description: 'Test request updated successfully.' })
    @ApiResponse({ status: 404, description: 'Test request not found.' })
    update(@Param('id') id: string, @Body() dto: UpdateTestRequestDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete test request', description: 'Remove a test request' })
    @ApiParam({ name: 'id', description: 'Test Request ID' })
    @ApiResponse({ status: 200, description: 'Test request deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Test request not found.' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
