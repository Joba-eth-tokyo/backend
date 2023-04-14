import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Network {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  chain_id: number;

  @Column()
  name: string;
}
