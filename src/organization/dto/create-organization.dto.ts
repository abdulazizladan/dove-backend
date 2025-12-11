import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
    @ApiProperty({ description: 'Organization name', example: 'General Hospital' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Organization address', example: '123 Health St.', required: false })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({ description: 'Contact number', example: '+1234567890', required: false })
    @IsString()
    @IsOptional()
    contact?: string;

    @ApiProperty({ description: 'URL to organization logo', example: 'http://example.com/logo.png', required: false })
    @IsString()
    @IsOptional()
    logo_url?: string;
}
