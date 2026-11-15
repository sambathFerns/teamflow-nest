import {
  Controller,
  Get,
  Body,
  Post,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/create-projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAll() {
    return this.projectsService.getAll();
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto.name);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    const project = this.projectsService.findOne(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  @Put()
  updateOne(@Body() dto: UpdateProjectDto) {
    const project = this.projectsService.update(dto.id, dto.name);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number) {
    const project = this.projectsService.remove(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }
}
