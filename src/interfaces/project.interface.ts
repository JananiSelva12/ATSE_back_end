import { RoleUser } from "./userRoles.interface";

interface CreateProjectPayloadParams {
  name: string;
  address: string;
  employer_id: number;
  contractor_id: number;
  project_type: string;
}

interface UpdateProjectPayloadParams {
  id: number;
  name: string;
  address: string;
  project_type: string;
  employer_id: number;
  contractor_id: number;
}

export { CreateProjectPayloadParams, UpdateProjectPayloadParams };
