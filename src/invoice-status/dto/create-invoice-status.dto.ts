import { IsEnum } from 'class-validator';
import { Status } from '../enums/status.enum';

export class CreateInvoiceStatusDto {
  @IsEnum(Status)
  name: Status;
}
