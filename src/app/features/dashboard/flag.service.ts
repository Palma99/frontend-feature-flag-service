import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Flag } from './models/Flag';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  private httpClient = inject(HttpClient)

  updateFlags(environmentId: number, flags: Flag[]) {
    return this.httpClient.put(`http://localhost:3000/flag/environment/${environmentId}`, flags);
  }

  createFlag(projectId: number, flagName: string) {
    return this.httpClient.post('http://localhost:3000/flag', { projectId, flagName });
  }
}
