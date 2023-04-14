import { PartialType } from '@nestjs/swagger';
import { CreateCommentFileDto } from './create-comment-file.dto';

export class UpdateCommentFileDto extends PartialType(CreateCommentFileDto) {}
