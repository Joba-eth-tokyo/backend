import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceStatusService } from './invoice-status.service';
import { CreateInvoiceStatusDto } from './dto/create-invoice-status.dto';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('invoice-status')
@ApiTags('Invoice status')
export class InvoiceStatusController {
  constructor(private readonly invoiceStatusService: InvoiceStatusService) {}

  @Post()
  create(@Body() createInvoiceStatusDto: CreateInvoiceStatusDto) {
    return this.invoiceStatusService.create(createInvoiceStatusDto);
  }

  @Get()
  findAll() {
    return this.invoiceStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceStatusDto: UpdateInvoiceStatusDto) {
    return this.invoiceStatusService.update(+id, updateInvoiceStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceStatusService.remove(+id);
  }
}
