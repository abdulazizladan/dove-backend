import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Payment } from '../test-requests/entities/payment.entity';
import { subDays, startOfDay, endOfDay, format } from 'date-fns';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
    ) { }

    async getPaymentsForGraph() {
        const today = new Date();
        const thirtyDaysAgo = subDays(today, 30);

        // Create a map of dates for the last 30 days initialized to 0
        const paymentsByDate = new Map<string, number>();
        for (let i = 0; i < 30; i++) {
            const date = subDays(today, i);
            paymentsByDate.set(format(date, 'yyyy-MM-dd'), 0);
        }

        const payments = await this.paymentRepository.find({
            where: {
                payment_date: Between(startOfDay(thirtyDaysAgo), endOfDay(today)),
            },
        });

        payments.forEach(payment => {
            const dateStr = format(payment.payment_date, 'yyyy-MM-dd');
            if (paymentsByDate.has(dateStr)) {
                const currentTotal = paymentsByDate.get(dateStr) || 0;
                paymentsByDate.set(dateStr, currentTotal + Number(payment.amount));
            }
        });

        // Convert map to array and reverse to show oldest to newest
        return Array.from(paymentsByDate, ([date, total]) => ({ date, total })).reverse();
    }

    async findOne(id: string) {
        return this.paymentRepository.findOne({
            where: { id },
            relations: ['testRequest', 'testRequest.patient', 'testRequest.test'],
        });
    }

    async getAllPayments() {
        return this.paymentRepository.find({
            relations: ['testRequest', 'testRequest.patient', 'testRequest.test'],
            order: {
                payment_date: 'DESC'
            }
        });
    }
}
