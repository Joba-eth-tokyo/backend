import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCommentsController } from './project-comments.controller';
import { ProjectCommentsService } from './project-comments.service';

describe('ProjectCommentsController', () => {
  let controller: ProjectCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectCommentsController],
      providers: [ProjectCommentsService],
    }).compile();

    controller = module.get<ProjectCommentsController>(ProjectCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
