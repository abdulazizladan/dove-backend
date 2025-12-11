import { Controller, Get, UseGuards } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('activity-log')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('activity-log')
export class ActivityLogController {
    constructor(private readonly service: ActivityLogService) { }

    @Get()
    @ApiOperation({ summary: 'View activity logs', description: 'Retrieve a list of system activity logs' })
    @ApiResponse({ status: 200, description: 'List of activity logs returned.' })
    findAll() {
        return this.service.findAll();
    }
}
