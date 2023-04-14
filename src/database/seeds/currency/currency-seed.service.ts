import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from 'src/currency/entities/currency.entity';
import { LoggerService } from 'src/logger/logger.service';
import { Network } from 'src/network/entities/network.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencySeedService {
  constructor(
    private readonly logger: LoggerService = new Logger(CurrencySeedService.name),
    @InjectRepository(Currency) private readonly currencyRepository: Repository<Currency>,
  ) {}

  async run() {
    const data = [
      {
        name: 'goerli testnet',
        address: '0x7af963cF6D228E564e2A0aA0DdBF06210B38615D',
        network: '67b7337f-f0cb-46e7-8a3c-0cf0a6dcf591',
        ticker: 'Goerli Test Token (TST)',
      },
    ];

    const promise = data.map((d) => {
      return new Promise(async (resolve) => {
        const currency = new Currency();
        currency.name = d.name;
        currency.address = d.address;
        currency.network = d.network;
        currency.ticker = d.ticker;

        const currencyData = await this.currencyRepository.findOne({
          address: d.address,
        });

        if (currencyData) {
          this.logger.debug(JSON.stringify(currencyData));
          resolve(null);
        } else {
          const response = await this.currencyRepository.save(currency).catch((error) => {
            this.logger.debug(error.message);
          });

          resolve(response);
        }
      });
    });

    await Promise.all(promise).catch((err) => {
      this.logger.debug(err);
    });

    this.logger.debug('CURRENCY SEED  SUCCESS');
  }
}
