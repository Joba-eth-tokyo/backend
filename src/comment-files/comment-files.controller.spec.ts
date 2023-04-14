import { Test, TestingModule } from '@nestjs/testing';
import { CommentFilesController } from './comment-files.controller';
import { CommentFilesService } from './comment-files.service';

describe('CommentFilesController', () => {
  let controller: CommentFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentFilesController],
      providers: [CommentFilesService],
    }).compile();

    controller = module.get<CommentFilesController>(CommentFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
