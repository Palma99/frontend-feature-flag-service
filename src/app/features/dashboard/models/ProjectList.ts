export type ProjectListDTO = {
  projects: ProjectList[]  
}

export type ProjectCreatedDTO = {
  projectId: number
}

export type ProjectList = {
  id: number;
  name: string;
  owner_id: string
}

