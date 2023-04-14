import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceStatus } from 'src/invoice-status/entities/invoice-status.entity';
import { LoggerService } from 'src/logger/logger.service';
import { Repository } from 'typeorm';
import { Status } from '../../../invoice-status/enums/status.enum';

@Injectable()
export class InvoiceStatusSeedService {
  constructor(
    private readonly logger: LoggerService = new Logger(InvoiceStatusSeedService.name),
    @InjectRepository(InvoiceStatus) private readonly invoiceStatusRepository: Repository<InvoiceStatus>,
  ) {}

  async run() {
    const data = [{ name: Status.created }, { name: Status.sent }, { name: Status.paid }];

    const promise = data.map((d) => {
      return new Promise(async (resolve) => {
        const invoiceStatus = new InvoiceStatus();
        invoiceStatus.name = d.name;

        const invoiceStatusData = await this.invoiceStatusRepository.findOne({
          name: d.name,
        });

        if (invoiceStatusData) {
          this.logger.debug(JSON.stringify(invoiceStatusData));
          resolve(null);
        } else {
          const response = await this.invoiceStatusRepository.save(invoiceStatus).catch((error) => {
            this.logger.debug(error.message);
          });

          resolve(response);
        }
      });
    });

    await Promise.all(promise).catch((err) => {
      this.logger.debug(err);
    });

    this.logger.debug('INVOICE_STATUS SEED  SUCCESS');
  }
}
