import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceStatusController } from './invoice-status.controller';
import { InvoiceStatusService } from './invoice-status.service';

describe('InvoiceStatusController', () => {
  let controller: InvoiceStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceStatusController],
      providers: [InvoiceStatusService],
    }).compile();

    controller = module.get<InvoiceStatusController>(InvoiceStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
