import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReferringDoctorDto {
    @ApiProperty({ description: 'First name of the doctor' })
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty({ description: 'Last name of the doctor' })
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty({ description: 'Phone number of the doctor', required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ description: 'Email address of the doctor', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: 'ID of the hospital the doctor belongs to', required: false })
    @IsOptional()
    @IsUUID()
    hospitalId?: string;
}
