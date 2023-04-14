import { NestFactory } from '@nestjs/core';
import { CurrencySeedService } from './currency/currency-seed.service';
import { InvoiceStatusSeedService } from './invoice-status/invoice-status-seed.service';
import { NetworkSeedService } from './network/network-seed.service';
import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(InvoiceStatusSeedService).run();
  await app.get(NetworkSeedService).run();
  await app.get(CurrencySeedService).run();

  await app.close();
};

void runSeed();
