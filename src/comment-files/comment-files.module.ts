import { Module } from '@nestjs/common';
import { CommentFilesService } from './comment-files.service';
import { CommentFilesController } from './comment-files.controller';

@Module({
  controllers: [CommentFilesController],
  providers: [CommentFilesService]
})
export class CommentFilesModule {}
