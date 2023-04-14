import { Invoice } from 'src/invoice/entities/invoice.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectStatus } from '../enums/project-status.enum';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  invoice: string;

  @Column()
  role: string;

  @Column()
  client: string;

  @Column()
  worker: string;

  @Column({ nullable: true })
  client_rating: number;

  @Column({ nullable: true })
  worker_rating: number;

  @Column({ type: 'date', nullable: true })
  due_date: Date;

  @Column({ type: 'enum', enum: ProjectStatus })
  status: ProjectStatus;

  @OneToOne(() => Invoice, (invoice) => invoice.id)
  @JoinColumn({ name: 'invoice' })
  project_invoice: Invoice;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'client' })
  client_user: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'worker' })
  worker_user: User;
}
