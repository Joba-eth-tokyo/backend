import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InvoiceStatusService } from 'src/invoice-status/invoice-status.service';
import { Status } from 'src/invoice-status/enums/status.enum';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly logger: LoggerService = new Logger(InvoiceService.name),
    @InjectRepository(Invoice) private readonly invoiceRepository: Repository<Invoice>,
    private readonly invoiceStatusService: InvoiceStatusService,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto, user: User): Promise<Record<string, any>> {
    let isOk = false;

    const invoice = new Invoice();

    invoice.request_network_id = createInvoiceDto.request_network_id;
    invoice.request_network_url = createInvoiceDto.request_network_url;
    invoice.status = createInvoiceDto.status;
    invoice.amount = createInvoiceDto.amount.toString();
    invoice.currency = createInvoiceDto.currency;
    invoice.due_date = createInvoiceDto.due_date;
    invoice.user_id = user.id;

    await validate(CreateInvoiceDto).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });

    if (isOk) {
      const data = await this.invoiceRepository.save(invoice).catch((error) => {
        this.logger.debug(`${error.message}`);
        isOk = false;
        return error;
      });
      if (isOk) {
        return { status: 200, content: { sucess: true, data } };
      } else {
        return { status: 400, content: { sucess: false, msg: data?.message } };
      }
    } else {
      return { status: 400, content: { sucess: false, msg: 'Invoice Create failed!' } };
    }
  }

  async findAll(user: User) {
    const invoiceStatus = await this.invoiceStatusService.findAll();
    const createdStatus = invoiceStatus.find((status) => status.name === Status.created);
    const invoicesList = await this.invoiceRepository.find({
      where: [{ user_id: user.id, status: createdStatus.id }],
    });
    return invoicesList;
  }

  async findOne(id: string): Promise<Record<string, any>> {
    try {
      const response = await this.invoiceRepository.findOne(
        {
          id,
        },
        {
          relations: ['invoice_status'],
        },
      );

      return { status: 200, content: { sucess: true, data: response } };
    } catch (error) {
      this.logger.debug(error.message);
      return { status: 400, content: { sucess: false, msg: 'No data founded!' } };
    }
  }

  async updateStatus(id: string, invoiceDto: Invoice) {
    try {
      const response = await this.invoiceRepository.update(id, {
        status: invoiceDto.status,
      });

      return { status: 200, content: { sucess: true, data: response } };
    } catch (error) {
      this.logger.debug(error.message);
      return { status: 400, content: { sucess: false, msg: error.message } };
    }
  }

  async updateStatusByName(id: string, statusName: Status) {
    try {
      const invoiceStatus = await this.invoiceStatusService.findAll();
      const UpdateStatus = invoiceStatus.find((status) => status.name === statusName);
      const response = await this.invoiceRepository.update(id, {
        status: UpdateStatus.id,
      });

      return { status: 200, content: { sucess: true, data: response } };
    } catch (error) {
      this.logger.debug(error.message);
      return { status: 400, content: { sucess: false, msg: error.message } };
    }
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
