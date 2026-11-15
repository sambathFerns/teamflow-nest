import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  private projects = [
    { id: 1, name: 'Website redesign' },
    { id: 2, name: 'Mobile app' },
  ];

  getAll() {
    return this.projects;
  }

  create(name: string) {
    const project = {
      id: Date.now(),
      name,
    };

    this.projects.push(project);
    return project;
  }

  findOne(id: number) {
    return this.projects.find((project) => project.id === id);
  }

  update(id: number, name: string) {
    const project = this.projects.find((item) => item.id === id);

    if (!project) {
      return null;
    }

    project.name = name;
    return project;
  }

  remove(id: number) {
    const index = this.projects.findIndex((project) => project.id === id);

    console.log(index, this.projects, 'index');

    if (index === -1) {
      return null;
    }

    return this.projects.splice(index, 1)[0];
  }
}
