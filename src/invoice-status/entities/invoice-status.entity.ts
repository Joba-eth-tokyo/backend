import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enums/status.enum';

@Entity()
export class InvoiceStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Status,
  })
  name: Status;
}
