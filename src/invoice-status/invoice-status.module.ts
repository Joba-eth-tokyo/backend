import { Module } from '@nestjs/common';
import { InvoiceStatusService } from './invoice-status.service';
import { InvoiceStatusController } from './invoice-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceStatus } from './entities/invoice-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceStatus])],
  controllers: [InvoiceStatusController],
  providers: [InvoiceStatusService],
  exports: [InvoiceStatusService],
})
export class InvoiceStatusModule {}
