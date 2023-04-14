import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { Project } from './entities/project.entity';

@Controller('project')
@ApiTags('Project')
@ApiBearerAuth()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiBody({
    schema: {
      $ref: '',
      example: {
        name: 'test project',
        description: 'test project',
        invoice: '05b85e20-a9b6-42ba-ac63-9a836f7dccb8',
        role: 'user',
        worker: '2d0c88de-81a5-4512-b6b8-9a42993b092a',
        client: '1a330419-9e74-4cd9-ac7a-f51612d20e5d',
        client_rating: 0,
        worker_rating: 0,
        due_date: '2023-03-28T00:00:00.000Z',
        status: 'pending',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Res() res, @Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectService.create(createProjectDto);
    res.status(project.status).json(project.content);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req, @Res() res) {
    const userData = req.user;
    const projects = await this.projectService.findAll(userData);
    res.status(projects.status).json(projects.content);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    schema: {
      example: 'a7fce53f-a5b7-4379-a95d-33a9c924f08f',
    },
  })
  async findOne(@Req() req, @Res() res, @Param('id') id: string) {
    const userData = req.user;
    const projectData = await this.projectService.findOne(id, userData);
    res.status(projectData.status).json(projectData.content);
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
  async updateStatus(@Req() req, @Res() res, @Body() updateProjectDto: Project) {
    const projectData = await this.projectService.updateStatus(updateProjectDto.id, updateProjectDto);
    res.status(projectData.status).json(projectData.content);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    schema: {
      $ref: '',
      example: {
        name: 'test project update',
        description: 'test project update',
      },
    },
  })
  @ApiParam({
    name: 'id',
    schema: {
      example: 'a7fce53f-a5b7-4379-a95d-33a9c924f08f',
    },
  })
  async update(@Req() req, @Res() res, @Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    const project = await this.projectService.update(id, updateProjectDto);
    res.status(project.status).json(project.content);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
