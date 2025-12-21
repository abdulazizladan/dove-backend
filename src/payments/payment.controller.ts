import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get('graph')
    getPaymentsForGraph() {
        return this.paymentService.getPaymentsForGraph();
    }

    @Get()
    async getAllPayments() {
        const payments = await this.paymentService.getAllPayments();
        // Transform to flat structure as requested
        return payments.map(payment => ({
            id: payment.id,
            payment_date: payment.payment_date,
            amount: payment.amount,
            mode: payment.mode,
            patient_name: payment.testRequest?.patient?.name || 'Unknown',
            test_name: payment.testRequest?.test?.name || 'Unknown',
            outstanding_balance: payment.testRequest?.outstanding_balance || 0
        }));
    }
}
