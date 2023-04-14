import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceStatusService } from './invoice-status.service';

describe('InvoiceStatusService', () => {
  let service: InvoiceStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceStatusService],
    }).compile();

    service = module.get<InvoiceStatusService>(InvoiceStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
