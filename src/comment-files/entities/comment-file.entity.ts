import { ProjectComment } from 'src/project-comments/entities/project-comment.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class CommentFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  comment_id: string;

  @CreateDateColumn()
  created_at;

  @ManyToOne(() => ProjectComment, (project_comment) => project_comment.id)
  @JoinColumn({ name: 'comment_id' })
  project_comment: ProjectComment;
}
