import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Flag } from './models/Flag';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  private httpClient = inject(HttpClient)

  getProjectFlags(projectId: number) {
    return this.httpClient.get<{
      projectFlags: Omit<Flag, 'enabled'>[]
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
