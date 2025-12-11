import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
    @ApiProperty({ description: 'Full name of the patient', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Date of birth (ISO 8601)', example: '1990-01-01' })
    @IsDateString()
    @IsNotEmpty()
    date_of_birth: string;

    @ApiProperty({ description: 'Contact number/email', example: '+1234567890' })
    @IsString()
    @IsNotEmpty()
    contact: string;

    @ApiProperty({ description: 'Gender of the patient', example: 'Male' })
    @IsString()
    @IsNotEmpty()
    gender: string;
}
