import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectEditorService {

  // TODO: -1 perché deve essere un numero, fixare il tipo in modo che possa essere null
  public selectedProjectId = signal<number>(-1)

  constructor() { }
}
