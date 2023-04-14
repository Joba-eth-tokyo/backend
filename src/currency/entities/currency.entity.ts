import { Network } from 'src/network/entities/network.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  network: string;

  @Column()
  ticker: string;

  @Column()
  name: string;

  @ManyToOne(() => Network, (network) => network.id)
  @JoinColumn({ name: 'network' })
  currency_network: Network;
}
