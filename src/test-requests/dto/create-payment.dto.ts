import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty({ description: 'Payment amount', example: 50.00 })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    amount: number;
}
