import { IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  address: string;

  @IsString()
  network: string;

  @IsString()
  ticker: string;

  @IsString()
  name: string;
}
