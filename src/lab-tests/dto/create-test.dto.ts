import { IsNotEmpty, IsString, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestDto {
    @ApiProperty({ description: 'ID of the test', example: 'CBC' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'Name of the test', example: 'Complete Blood Count' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Standard price for the test', example: 120.50 })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ description: 'ID of the responsible department', example: 'uuid-string' })
    @IsUUID()
    @IsNotEmpty()
    departmentId: string;
}
