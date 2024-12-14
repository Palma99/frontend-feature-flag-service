import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Flag } from './models/Flag';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  private httpClient = inject(HttpClient)

  getEnvironmentFlagPayload(publicKey: string) {
    return this.httpClient.get(`http://localhost:3000/public/v1/flags?public_key=${publicKey}`);
  }

  deleteFlag(flagId: number) {
    return this.httpClient.delete(`http://localhost:3000/flag/${flagId}`);
  }

  fetchProjectFlags(projectId: number) {
    return this.httpClient.get<{
      projectFlags: Flag[]
    }>(`http://localhost:3000/flag/project/${projectId}`).pipe(
      map(({ projectFlags }) => projectFlags),
    );
  }

  updateFlags(environmentId: number, flags: Flag[]) {
    return this.httpClient.put(`http://localhost:3000/flag/environment/${environmentId}`, flags);
  }

  createFlag(projectId: number, flagName: string) {
    return this.httpClient.post('http://localhost:3000/flag', { projectId, flagName });
  }
}
