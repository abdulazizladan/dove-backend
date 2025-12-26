import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadResultDto {
    @ApiProperty({ description: 'Summary of the test result', example: 'Test results show normal levels' })
    @IsString()
    summary: string;

    @ApiProperty({ description: 'URL or path to result attachment', required: false, example: 'https://example.com/result.pdf' })
    @IsString()
    @IsOptional()
    attachment?: string;
}
