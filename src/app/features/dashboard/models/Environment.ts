export type Environment = {
  id: number;
  name: string;
  project_id: number;
  public_key: string;
  flags: null;
}

export type EnvironmentDetailsDTO = {
  environment: EnvironmentDetails;
}

export type EnvironmentDetails = {
  id: number;
  name: string;
  project_id: number;
  public_key: string;
  flags: {
    id: number;
    name: string;
    project_id: number;
    enabled: boolean;
  }[];
}