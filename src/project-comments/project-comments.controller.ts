import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectCommentsService } from './project-comments.service';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { UpdateProjectCommentDto } from './dto/update-project-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('project-comments')
@ApiTags('Project comments')
export class ProjectCommentsController {
  constructor(private readonly projectCommentsService: ProjectCommentsService) {}

  @Post()
  create(@Body() createProjectCommentDto: CreateProjectCommentDto) {
    return this.projectCommentsService.create(createProjectCommentDto);
  }

  @Get()
  findAll() {
    return this.projectCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectCommentDto: UpdateProjectCommentDto) {
    return this.projectCommentsService.update(+id, updateProjectCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectCommentsService.remove(+id);
  }
}
