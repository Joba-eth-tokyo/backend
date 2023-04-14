import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from 'src/currency/entities/currency.entity';
import { LoggerModule } from 'src/logger/logger.module';
import { CurrencySeedService } from './currency-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Currency]), LoggerModule],
  providers: [CurrencySeedService],
  exports: [CurrencySeedService],
})
export class CurrencySeedModule {}
