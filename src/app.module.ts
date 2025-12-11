import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';
import { StructureModule } from './structure/structure.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { LoggingInterceptor } from './activity-log/logging.interceptor';
import { PatientsModule } from './patients/patients.module';
import { TestRequestsModule } from './test-requests/test-requests.module';
import { LabTestsModule } from './lab-tests/lab-tests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: 'dove.db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    OrganizationModule,
    StructureModule,
    ActivityLogModule,
    PatientsModule,
    PatientsModule,
    TestRequestsModule,
    LabTestsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule { }
