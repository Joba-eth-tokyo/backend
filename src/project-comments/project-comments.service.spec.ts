import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCommentsService } from './project-comments.service';

describe('ProjectCommentsService', () => {
  let service: ProjectCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectCommentsService],
    }).compile();

    service = module.get<ProjectCommentsService>(ProjectCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
