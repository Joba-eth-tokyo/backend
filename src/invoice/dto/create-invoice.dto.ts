import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsOptional()
  @IsNumber()
  request_network_id: number;

  @IsOptional()
  @IsString()
  request_network_url: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  user_id: string;

  @IsOptional()
  @IsString()
  interval_duration: string;

  @IsOptional()
  @IsString()
  flow_rate_per_second

  @IsOptional()
  @IsString()
  payer_wallet

  @IsOptional()
  @IsDate()
  due_date: Date;

  @IsOptional()
  @IsDate()
  created_at: Date;
}
