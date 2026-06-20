import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Flag } from './models/Flag';
import { map } from 'rxjs';
import { API_BASE_URL } from '../../core/http/api.config';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  private httpClient = inject(HttpClient)

  getEnvironmentFlagPayload(publicKey: string) {
    return this.httpClient.get(`${API_BASE_URL}/public/v1/flags?public_key=${publicKey}`);
  }

  deleteFlag(flagId: number) {
    return this.httpClient.delete(`${API_BASE_URL}/flag/${flagId}`);
  }

  fetchProjectFlags(projectId: number) {
    return this.httpClient.get<{
      projectFlags: Flag[]
    }>(`${API_BASE_URL}/flag/project/${projectId}`).pipe(
      map(({ projectFlags }) => projectFlags),
    );
  }

  updateFlags(environmentId: number, flags: Flag[]) {
    return this.httpClient.put(`${API_BASE_URL}/flag/environment/${environmentId}`, flags);
  }

  createFlag(projectId: number, flagName: string) {
    return this.httpClient.post(`${API_BASE_URL}/flag`, { projectId, flagName });
  }
}
