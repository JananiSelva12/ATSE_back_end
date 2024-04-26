// import { RoleUser } from "./userRoles.interface";

interface CreateUserPayloadParams {
  first_name: string;
  last_name: string;
  email: string;
  phoneNo: string;
  crypted_password: string;
  is_marketing: boolean;
  role_ids: number[];
}

interface UpdateUserPayloadParams {
  id: number;
  first_name: string;
  last_name: string;
  phoneNo: string;
  role_ids: number[];
}

interface UpdatedUser {
  id: number;
  first_name: string;
  last_name: string;
  phoneNo: string;
  newRoles: number[];
  removedRoles: number[];
}

export { CreateUserPayloadParams, UpdateUserPayloadParams, UpdatedUser };
