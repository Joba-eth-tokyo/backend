import { Module } from '@nestjs/common';
import { ProjectCommentsService } from './project-comments.service';
import { ProjectCommentsController } from './project-comments.controller';

@Module({
  controllers: [ProjectCommentsController],
  providers: [ProjectCommentsService]
})
export class ProjectCommentsModule {}
