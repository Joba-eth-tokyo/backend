import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { InvoiceModule } from './invoice/invoice.module';
import { NetworkModule } from './network/network.module';
import { CurrencyModule } from './currency/currency.module';
import { InvoiceStatusModule } from './invoice-status/invoice-status.module';
import { ProjectCommentsModule } from './project-comments/project-comments.module';
import { CommentFilesModule } from './comment-files/comment-files.module';
import configuration from './config';

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
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    ProjectModule,
    InvoiceModule,
    NetworkModule,
    CurrencyModule,
    InvoiceStatusModule,
    ProjectCommentsModule,
    CommentFilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
