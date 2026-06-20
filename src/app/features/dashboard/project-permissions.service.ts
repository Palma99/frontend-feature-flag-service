import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { API_BASE_URL } from '../../core/http/api.config';

type UserProjectPermissionsDTO = {
  permissions: string[]; 
}

@Injectable({
  providedIn: 'root'
})
export class ProjectPermissionsService {
  private httpClient = inject(HttpClient);

  private userPermissions = signal<string[]>([]);

  fetchUserProjectPermissions(projectId: number) {
    return this.httpClient.get<UserProjectPermissionsDTO>(`${API_BASE_URL}/project/${projectId}/permissions`)
      .pipe(map((response) => response.permissions))
      .subscribe((permissions) => {
        this.userPermissions.set(permissions);
      });
  }

  canDeleteFlag() {
    return this.userPermissions().includes('project.flag.delete');
  }

  canCreateEnvironment() {
    return this.userPermissions().includes('project.environment.create');
  }

  canCreateFlag() {
    return this.userPermissions().includes('project.flag.create');
  }

  canUpdateEnvironmentFlags() {
    return this.userPermissions().includes('project.environment.flags.update');
  }
}
