import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentFilesService } from './comment-files.service';
import { CreateCommentFileDto } from './dto/create-comment-file.dto';
import { UpdateCommentFileDto } from './dto/update-comment-file.dto';

@Controller('comment-files')
@ApiTags('Comment files')
export class CommentFilesController {
  constructor(private readonly commentFilesService: CommentFilesService) {}

  @Post()
  create(@Body() createCommentFileDto: CreateCommentFileDto) {
    return this.commentFilesService.create(createCommentFileDto);
  }

  @Get()
  findAll() {
    return this.commentFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentFilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentFileDto: UpdateCommentFileDto) {
    return this.commentFilesService.update(+id, updateCommentFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentFilesService.remove(+id);
  }
}
