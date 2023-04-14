import { IsNumber, IsString } from 'class-validator';

export class CreateCommentFileDto {
  @IsString()
  url: string;

  @IsString()
  comment_id: string;
}
