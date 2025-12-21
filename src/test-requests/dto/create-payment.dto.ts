import { IsNumber, IsPositive, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty({ description: 'Payment amount', example: 50.00 })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ description: 'Payment mode (e.g. cash, transfer)', example: 'cash' })
    @IsNotEmpty()
    @IsString()
    mode: string;
}
