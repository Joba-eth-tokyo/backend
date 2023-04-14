import { InvoiceStatus } from 'src/invoice-status/entities/invoice-status.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  request_network_id: number;

  @Column()
  request_network_url: string;

  @Column()
  status: string;

  @Column()
  amount: string;

  @Column()
  currency: string;

  @Column()
  user_id: string;

  @Column({ type: 'date', nullable: true })
  due_date: Date;

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
