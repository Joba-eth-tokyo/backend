import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceStatus } from 'src/invoice-status/entities/invoice-status.entity';
import { LoggerModule } from 'src/logger/logger.module';
import { InvoiceStatusSeedService } from './invoice-status-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceStatus]), LoggerModule],
  providers: [InvoiceStatusSeedService],
  exports: [InvoiceStatusSeedService],
})
export class InvoiceStatusSeedModule {}
