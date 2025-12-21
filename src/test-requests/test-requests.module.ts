import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestRequestsService } from './test-requests.service';
import { TestRequestsController } from './test-requests.controller';
import { TestRequest } from './entities/test-request.entity';
import { Test } from './entities/test.entity';
import { Payment } from './entities/payment.entity';
import { Result } from './entities/result.entity';
import { LabTestsModule } from '../lab-tests/lab-tests.module';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                TestRequest,
                Test,
                Payment,
                Result
            ]
        ),
        LabTestsModule
    ],
    controllers: [TestRequestsController],
    providers: [TestRequestsService],
})
export class TestRequestsModule { }
