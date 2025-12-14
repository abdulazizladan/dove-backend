import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHospitalDto {
    @ApiProperty({ description: 'Name of the hospital' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'Address of the hospital', required: false })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ description: 'Phone number of the hospital', required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ description: 'Contact person at the hospital', required: false })
    @IsOptional()
    @IsString()
    contact_person?: string;
}
