import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get('graph')
    getPaymentsForGraph() {
        return this.paymentService.getPaymentsForGraph();
    }



    @Get(':id')
    async getPaymentById(@Param('id') id: string) {
        const payment = await this.paymentService.findOne(id);
        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
        return {
            id: payment.id,
            payment_date: payment.payment_date,
            amount: payment.amount,
            mode: payment.mode,
            patient: payment.testRequest?.patient ? {
                id: payment.testRequest.patient.id,
                name: payment.testRequest.patient.name,
                contact: payment.testRequest.patient.contact,
                date_of_birth: payment.testRequest.patient.date_of_birth,
                gender: payment.testRequest.patient.gender
            } : null,
            test: payment.testRequest?.test ? {
                id: payment.testRequest.test.id,
                name: payment.testRequest.test.name,
                price: payment.testRequest.test.price
            } : null,
            test_request_status: payment.testRequest?.status,
            outstanding_balance: payment.testRequest?.outstanding_balance || 0
        };
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
