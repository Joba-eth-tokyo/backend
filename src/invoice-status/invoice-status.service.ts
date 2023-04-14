import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceStatusDto } from './dto/create-invoice-status.dto';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';
import { InvoiceStatus } from './entities/invoice-status.entity';

@Injectable()
export class InvoiceStatusService {
  constructor(@InjectRepository(InvoiceStatus) private readonly invoiceStatusRepo: Repository<InvoiceStatus>) {}
  create(createInvoiceStatusDto: CreateInvoiceStatusDto) {
    return 'This action adds a new invoiceStatus';
  }

  findAll() {
    return this.invoiceStatusRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceStatus`;
  }

  update(id: number, updateInvoiceStatusDto: UpdateInvoiceStatusDto) {
    return `This action updates a #${id} invoiceStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceStatus`;
  }
}
