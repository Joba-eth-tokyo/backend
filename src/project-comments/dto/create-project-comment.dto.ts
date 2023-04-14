import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateProjectCommentDto {
  @IsString()
  user_id: string;

  @IsDate()
  timestamp_posted: Date;

  @IsOptional()
  @IsDate()
  timestamp_edited: Date;

  @IsString()
  project_id: string;
}
