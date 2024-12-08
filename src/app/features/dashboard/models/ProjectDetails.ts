export type ProjectDetailsDTO = {
  project: ProjectDetails;
}

export type ProjectDetails = {
  id: number;
  name: string;
  owner_id: number;

  environments: {
    id: number;
    name: string;
    project_id: number;
    public_key: string;
    flags: null;
  }[];

  members: {
    id: number;
  }[];
}
