import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
    @ApiProperty({ description: 'User email address', example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User password', example: 'strongPassword123', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ description: 'User role', enum: UserRole, example: UserRole.STAFF })
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({ description: 'Designation ID', example: 'uuid-string', required: false })
    @IsOptional()
    @IsUUID()
    designationId?: string;
}
