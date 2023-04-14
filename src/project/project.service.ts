import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Status } from 'src/invoice-status/enums/status.enum';
import { InvoiceService } from 'src/invoice/invoice.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly logger: LoggerService = new Logger(ProjectService.name),
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    private readonly userService: UsersService,
    private readonly invoiceService: InvoiceService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    let isOk = false;

    let user = await this.userService.findOneByAddres(createProjectDto.client);

    if (!user) {
      user = await this.userService.create({
        wallet_address: createProjectDto.client,
      });
    }

    const project = new Project();

    project.name = createProjectDto.name;
    project.description = createProjectDto.description;
    project.invoice = createProjectDto.invoice;
    project.role = createProjectDto.role;
    project.client = user.id;
    project.worker = createProjectDto.worker;
    project.client_rating = createProjectDto?.client_rating || null;
    project.worker_rating = createProjectDto?.worker_rating || null;
    project.due_date = createProjectDto.due_date;
    project.status = createProjectDto.status;

    await validate(createProjectDto).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });

    if (isOk) {
      const data = await this.projectRepository.save(project).catch((error) => {
        this.logger.debug(error.message);
        isOk = false;
      });
      await this.invoiceService.updateStatusByName(createProjectDto.invoice, Status.sent).catch((err) => {
        this.logger.debug(err.message);
        isOk = false;
      });

      if (isOk) {
        return { status: 200, content: { sucess: true, data } };
      } else {
        return { status: 400, content: { sucess: false, msg: 'Project already exists' } };
      }
    } else {
      return { status: 400, content: { sucess: false, msg: 'Project Create failed!' } };
    }
  }

  async findAll(user: User) {
    try {
      const response = await this.projectRepository.find({
        where: [{ client: user.id }, { worker: user.id }],
        relations: ['project_invoice'],
      });

      return { status: 200, content: { sucess: true, data: response } };
    } catch (error) {
      this.logger.debug(error.message);
      return { status: 400, content: { sucess: false, msg: 'No data founded!' } };
    }
  }

  async findOne(id: string, user: User) {
    try {
      const response = await this.projectRepository.findOne(
        {
          id,
        },
        {
          relations: ['project_invoice', 'project_invoice.invoice_status', 'client_user', 'worker_user'],
        },
      );

      if (response.client === user.id || response.worker === user.id) {
        return { status: 200, content: { sucess: true, data: response } };
      }
      return { status: 201, content: { sucess: true, data: { error: 'Sorry, you do not have permission to view this.' } } };
    } catch (error) {
      this.logger.debug(error.message);
      return { status: 400, content: { sucess: false, msg: 'No data founded!' } };
    }
  }

  async updateStatus(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      const response = await this.projectRepository.update(id, {
        status: updateProjectDto.status,
      });

      return { status: 200, content: { sucess: true, data: response } };
    } catch (error) {
      this.logger.debug(error.message);
      return { status: 400, content: { sucess: false, msg: error.message } };
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      const response = await this.projectRepository.update(id, updateProjectDto);

      return { status: 200, content: { sucess: true, data: response } };
    } catch (error) {
      this.logger.debug(error.message);
      return { status: 400, content: { sucess: false, msg: 'No data founded!' } };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
