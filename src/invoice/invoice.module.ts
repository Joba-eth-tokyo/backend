import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { InvoiceStatusModule } from 'src/invoice-status/invoice-status.module';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
  imports: [TypeOrmModule.forFeature([Invoice]), LoggerModule, InvoiceStatusModule],
})
export class InvoiceModule {}
