import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
    @ApiProperty({ description: 'Name of the department', example: 'Cardiology' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Organization ID', example: 'uuid-string' })
    @IsString()
    @IsNotEmpty()
    organizationId: string;
}
