import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { Invoice } from './entities/invoice.entity';

@Controller('invoice')
@ApiTags('Invoice')
@ApiBearerAuth()
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Post()
  @ApiBody({
    schema: {
      $ref: '',
      example: {
        request_network_id: 5,
        request_network_url: 'google.com',
        status: '3a6e72a6-aef3-4e89-b5fd-6274c3c8d20b',
        amount: 10,
        currency: '6a682023-26f0-4ee6-96a4-c2e14d690592',
        due_date: '2023-03-22T09:23:52.546Z',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Res() res, @Body() createInvoiceDto: CreateInvoiceDto) {
    const userData = req.user;
    const invoice = await this.invoiceService.create(createInvoiceDto, userData);
    res.status(invoice.status).json(invoice.content);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req, @Res() res) {
    try {
      const userData = req.user;
      const invoices = await this.invoiceService.findAll(userData);
      res.status(200).json(invoices);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    schema: {
      example: '05b85e20-a9b6-42ba-ac63-9a836f7dccb8',
    },
  })
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() req, @Res() res, @Param('id') id: string) {
    const invoiceData = await this.invoiceService.findOne(id);
    res.status(invoiceData.status).json(invoiceData.content);
  }

  @Post('update-status')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    schema: {
      $ref: '',
      example: {
        id: '31dc8937-2d3b-4bef-bb00-245b24892302',
        status: 'bbdcc42e-e8ed-488f-89e0-17b6eb7e7e54',
      },
    },
  })
  async updateStatus(@Req() req, @Res() res, @Body() updateInvoiceDto: Invoice) {
    const invoiceData = await this.invoiceService.updateStatus(updateInvoiceDto.id, updateInvoiceDto);
    res.status(invoiceData.status).json(invoiceData.content);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
