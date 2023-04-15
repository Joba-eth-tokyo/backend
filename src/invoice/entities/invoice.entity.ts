import { InvoiceStatus } from 'src/invoice-status/entities/invoice-status.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';



// description: '',
// invoiceCurrency: filteredCurrencyListByChain.at(0),
// amount: '',
// intervalDuration: 'weekly',
// flowRatePerSecond: 0,
// endDate: undefined, // new Date(),


@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  request_network_id: number;

  @Column({ nullable: true })
  request_network_url: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  amount: string;

  @Column()
  currency: string;

  @Column()
  user_id: string;

  @Column({ type: 'date', nullable: true })
  due_date: Date;

  @Column({ nullable: true })
  interval_duration: string;

  @Column({ nullable: true })
  flow_rate_per_second: string;

  @Column({ nullable: true })
  payer_wallet: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @ManyToOne(() => InvoiceStatus, (invoice_status) => invoice_status.id)
  @JoinColumn({ name: 'status' })
  invoice_status: InvoiceStatus;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Project, (project) => project.invoice)
  project: Project;
}
