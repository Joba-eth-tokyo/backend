import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from '../../config';
import { CurrencySeedModule } from './currency/currency-seed.module';
import { InvoiceStatusSeedModule } from './invoice-status/invoice-status-seed.module';
import { NetworkSeedModule } from './network/network-seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService],
    }),
    InvoiceStatusSeedModule,
    NetworkSeedModule,
    CurrencySeedModule,
  ],
})
export class SeedModule {}
