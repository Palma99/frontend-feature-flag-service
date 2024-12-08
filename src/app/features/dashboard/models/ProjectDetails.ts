import { Environment } from "./Environment";

export type ProjectDetailsDTO = {
  project: ProjectDetails;
}

export type ProjectDetails = {
  id: number;
  name: string;
  owner_id: number;

  environments: Environment[];

  members: {
    id: number;
    email: string;
    nickname: string;
  }[];
}
