import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabTestsService } from './lab-tests.service';
import { LabTestsController } from './lab-tests.controller';
import { Test } from '../test-requests/entities/test.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Test])],
    controllers: [LabTestsController],
    providers: [LabTestsService],
    exports: [LabTestsService],
})
export class LabTestsModule { }
