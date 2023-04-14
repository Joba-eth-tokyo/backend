import { Test, TestingModule } from '@nestjs/testing';
import { CommentFilesService } from './comment-files.service';

describe('CommentFilesService', () => {
  let service: CommentFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentFilesService],
    }).compile();

    service = module.get<CommentFilesService>(CommentFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
