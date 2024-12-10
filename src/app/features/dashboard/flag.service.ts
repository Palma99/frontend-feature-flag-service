import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvironmentDetailsDTO } from './models/Environment';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  private httpClient = inject(HttpClient)

  createFlag(projectId: number, flagName: string) {
    return this.httpClient.post('http://localhost:3000/flag', { projectId, flagName });
  }
}
