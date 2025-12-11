import { IsEnum, IsNotEmpty, IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TestRequestStatus } from '../enums/test-request-status.enum';

export class CreateTestRequestDto {
    @ApiProperty({ description: 'ID of the patient', example: 'uuid-string' })
    @IsUUID()
    @IsNotEmpty()
    patient_id: string;

    @ApiProperty({ description: 'ID of the test from catalog', example: 'uuid-string' })
    @IsUUID()
    @IsNotEmpty()
    testId: string;

    @ApiProperty({ description: 'Discount amount', example: 10.00, required: false, default: 0 })
    @IsNumber()
    @IsOptional()
    discount?: number;

    @ApiProperty({ description: 'Reason for discount', example: 'Staff family member', required: false })
    @IsString()
    @IsOptional()
    discount_reason?: string;
}
