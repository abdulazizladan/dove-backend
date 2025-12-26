import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { TestRequest } from './entities/test-request.entity';
import { CreateTestRequestDto } from './dto/create-test-request.dto';
import { UpdateTestRequestDto } from './dto/update-test-request.dto';
import { Test } from './entities/test.entity';
import { Payment } from './entities/payment.entity';
import { Result } from './entities/result.entity';

@Injectable()
export class TestRequestsService {
    constructor(
        @InjectRepository(TestRequest)
        private repo: Repository<TestRequest>,
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) { }

    async create(createTestRequestDto: any) {
        const test = await this.entityManager.findOne(Test, { where: { id: createTestRequestDto.testId } });
        if (!test) throw new NotFoundException('Test not found');

        const initialBalance = Number(test.price) - Number(createTestRequestDto.discount || 0);

        const testRequest = this.repo.create({
            ...createTestRequestDto,
            test,
            outstanding_balance: initialBalance,
        });
        return this.repo.save(testRequest);
    }

    async addPayment(id: string, amount: number, mode: string) {
        const testRequest = await this.repo.findOne({ where: { id }, relations: ['payments'] });
        if (!testRequest) throw new NotFoundException('Test request not found');

        const payment = new Payment();
        payment.amount = amount;
        payment.mode = mode;
        payment.testRequest = testRequest;
        await this.entityManager.save(Payment, payment);

        testRequest.outstanding_balance = Number(testRequest.outstanding_balance) - Number(amount);
        return this.repo.save(testRequest);
    }

    findAll() {
        return this.repo.find({ relations: ['test', 'payments', 'referringDoctor', 'referringDoctor.hospital', 'patient', 'result', 'result.uploadedBy'] });
    }

    findOne(id: string) {
        return this.repo.findOne({ where: { id }, relations: ['test', 'payments', 'referringDoctor', 'referringDoctor.hospital', 'patient', 'result', 'result.uploadedBy'] });
    }

    async uploadResult(testRequestId: string, summary: string, attachment: string, uploadedById: string) {
        const testRequest = await this.repo.findOne({ where: { id: testRequestId }, relations: ['result'] });
        if (!testRequest) throw new NotFoundException('Test request not found');

        // Check if result already exists
        if (testRequest.result) {
            // Update existing result
            testRequest.result.summary = summary;
            testRequest.result.attachment = attachment;
            testRequest.result.uploadedById = uploadedById;
            return this.entityManager.save(Result, testRequest.result);
        }

        // Create new result
        const result = new Result();
        result.summary = summary;
        result.attachment = attachment;
        result.testRequest = testRequest;
        result.uploadedById = uploadedById;
        return this.entityManager.save(Result, result);
    }

    update(id: string, dto: UpdateTestRequestDto) {
        return this.repo.update(id, dto);
    }

    remove(id: string) {
        return this.repo.delete(id);
    }
}
