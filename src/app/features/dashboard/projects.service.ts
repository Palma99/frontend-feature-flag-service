import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProjectCreatedDTO, ProjectListDTO } from './models/ProjectList';
import { map, Observable } from 'rxjs';
import { ProjectDetails, ProjectDetailsDTO } from './models/ProjectDetails';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private httpClient = inject(HttpClient);

  fetchProjectDetails(id: number): Observable<ProjectDetails> {
    return this.httpClient.get<ProjectDetailsDTO>(`http://localhost:3000/project/${id}`)
      .pipe(map((response) => response.project));
  }

  fetchProjects() {
    return this.httpClient.get<ProjectListDTO>('http://localhost:3000/project/list')
      .pipe(map((response) => response.projects));
  }

  createProject(projectName: string) {
    return this.httpClient.post<ProjectCreatedDTO>('http://localhost:3000/project', { projectName });
  }
}
