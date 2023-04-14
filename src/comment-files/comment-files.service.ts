import { Injectable } from '@nestjs/common';
import { CreateCommentFileDto } from './dto/create-comment-file.dto';
import { UpdateCommentFileDto } from './dto/update-comment-file.dto';

@Injectable()
export class CommentFilesService {
  create(createCommentFileDto: CreateCommentFileDto) {
    return 'This action adds a new commentFile';
  }

  findAll() {
    return `This action returns all commentFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentFile`;
  }

  update(id: number, updateCommentFileDto: UpdateCommentFileDto) {
    return `This action updates a #${id} commentFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentFile`;
  }
}
