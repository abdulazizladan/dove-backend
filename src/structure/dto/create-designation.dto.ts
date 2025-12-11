import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDesignationDto {
    @ApiProperty({ description: 'Title of the designation', example: 'Senior Surgeon' })
    @IsString()
    @IsNotEmpty()
    name: string;
}
