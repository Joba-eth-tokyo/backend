import { PartialType } from '@nestjs/swagger';
import { CreateInvoiceStatusDto } from './create-invoice-status.dto';

export class UpdateInvoiceStatusDto extends PartialType(CreateInvoiceStatusDto) {}
