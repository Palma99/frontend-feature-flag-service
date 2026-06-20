import { inject, Injectable } from '@angular/core';
import { of, map } from 'rxjs';
import { EnvironmentDetails, EnvironmentDetailsDTO } from './models/Environment';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../core/http/api.config';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private httpClient = inject(HttpClient);

  fetchEnvironmentDetails (id: number | null) {
    if (id === null) {
      return of({} as EnvironmentDetails);
    }

    return this.httpClient.get<EnvironmentDetailsDTO>(`${API_BASE_URL}/environment/${id}`)
      .pipe(map((response) => response.environment));
  }

  createEnvironment (projectId: number, name: string) {
    return this.httpClient.post<EnvironmentDetailsDTO>(`${API_BASE_URL}/environment`, { projectId, name });
  }
}
