import { Injectable } from '@nestjs/common';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { UpdateProjectCommentDto } from './dto/update-project-comment.dto';

@Injectable()
export class ProjectCommentsService {
  create(createProjectCommentDto: CreateProjectCommentDto) {
    return 'This action adds a new projectComment';
  }

  findAll() {
    return `This action returns all projectComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectComment`;
  }

  update(id: number, updateProjectCommentDto: UpdateProjectCommentDto) {
    return `This action updates a #${id} projectComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectComment`;
  }
}
