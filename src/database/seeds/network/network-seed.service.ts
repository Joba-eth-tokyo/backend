import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/logger.service';
import { Network } from 'src/network/entities/network.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NetworkSeedService {
  constructor(
    private readonly logger: LoggerService = new Logger(NetworkSeedService.name),
    @InjectRepository(Network) private readonly networkRepository: Repository<Network>,
  ) {}

  async run() {
    const data = [
      { name: 'goerli', chain_id: 5 },
      { name: 'ethereum_mainnet', chain_id: 1 },
      { name: 'matic', chain_id: 137 },
    ];

    const promise = data.map((d) => {
      return new Promise(async (resolve) => {
        const network = new Network();
        network.name = d.name;
        network.chain_id = d.chain_id;

        const networkData = await this.networkRepository.findOne({
          chain_id: d.chain_id,
        });

        if (networkData) {
          this.logger.debug(JSON.stringify(networkData));
          resolve(null);
        } else {
          const response = await this.networkRepository.save(network).catch((error) => {
            this.logger.debug(error.message);
          });

          resolve(response);
        }
      });
    });

    await Promise.all(promise).catch((err) => {
      this.logger.debug(err);
    });

    this.logger.debug('NETWORK SEED  SUCCESS');
  }
}
