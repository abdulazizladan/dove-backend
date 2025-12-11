import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateTestRequestDto } from './create-test-request.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { TestRequestStatus } from '../enums/test-request-status.enum';

export class UpdateTestRequestDto extends PartialType(CreateTestRequestDto) {
    @ApiProperty({ description: 'Status of the test request', enum: TestRequestStatus, example: TestRequestStatus.PENDING, required: false })
    @IsEnum(TestRequestStatus)
    @IsOptional()
    status?: TestRequestStatus;
}
