import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Designation } from './entities/designation.entity';
import { DepartmentController } from './department.controller';
import { DesignationController } from './designation.controller';
import { DepartmentService } from './department.service';
import { DesignationService } from './designation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Designation])],
  controllers: [DepartmentController, DesignationController],
  providers: [DepartmentService, DesignationService],
})
export class StructureModule {}
