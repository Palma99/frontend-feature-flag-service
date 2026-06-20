import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProjectCreatedDTO, ProjectListDTO } from './models/ProjectList';
import { map, Observable, of } from 'rxjs';
import { ProjectDetails, ProjectDetailsDTO } from './models/ProjectDetails';
import { Environment, EnvironmentDetails, EnvironmentDetailsDTO } from './models/Environment';
import { API_BASE_URL } from '../../core/http/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private httpClient = inject(HttpClient);

  fetchProjectDetails(id: number): Observable<ProjectDetails> {
    return this.httpClient.get<ProjectDetailsDTO>(`${API_BASE_URL}/project/${id}`)
      .pipe(map((response) => response.project));
  }

  fetchProjects() {
    return this.httpClient.get<ProjectListDTO>(`${API_BASE_URL}/project/list`)
      .pipe(map((response) => response.projects));
  }

  createProject(projectName: string) {
    return this.httpClient.post<ProjectCreatedDTO>(`${API_BASE_URL}/project`, { projectName });
  }
}
