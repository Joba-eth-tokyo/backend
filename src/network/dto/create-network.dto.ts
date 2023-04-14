import { IsNumber, IsString } from 'class-validator';

export class CreateNetworkDto {
  @IsNumber()
  chain_id: number;

  @IsString()
  name: string;
}
