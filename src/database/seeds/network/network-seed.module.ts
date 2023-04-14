import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { Network } from 'src/network/entities/network.entity';
import { NetworkSeedService } from './network-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Network]), LoggerModule],
  providers: [NetworkSeedService],
  exports: [NetworkSeedService],
})
export class NetworkSeedModule {}
