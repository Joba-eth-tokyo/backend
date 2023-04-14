import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProjectStatus } from '../enums/project-status.enum';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  invoice: string;

  @IsString()
  role: string;

  @IsString()
  client: string;

  @IsString()
  worker: string;

  @IsOptional()
  @IsNumber()
  client_rating: number;

  @IsOptional()
  @IsNumber()
  worker_rating: number;

  @IsOptional()
  @IsDate()
  due_date: Date;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}
