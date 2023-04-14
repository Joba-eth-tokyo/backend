import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  request_network_id: number;

  @IsString()
  request_network_url: string;

  @IsString()
  status: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  user_id: string;

  @IsOptional()
  @IsDate()
  due_date: Date;

  @IsOptional()
  @IsDate()
  created_at: Date;
}
