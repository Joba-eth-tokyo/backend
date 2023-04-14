import { User } from 'src/users/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ type: 'date' })
  timestamp_posted: Date;

  @Column({ type: 'date', nullable: true })
  timestamp_edited: Date;

  @Column()
  project_id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Project, (project) => project.id)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
