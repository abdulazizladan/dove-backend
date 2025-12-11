import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestRequestsService } from './test-requests.service';
import { TestRequestsController } from './test-requests.controller';
import { TestRequest } from './entities/test-request.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TestRequest])],
    controllers: [TestRequestsController],
    providers: [TestRequestsService],
})
export class TestRequestsModule { }
