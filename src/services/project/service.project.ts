import {
  CreateProjectPayloadParams,
  UpdateProjectPayloadParams,
} from "../../interfaces/project.interface";
import DAL from "./dal.project";

const create = async (params: CreateProjectPayloadParams) => DAL.create(params);

const update = async (params: UpdateProjectPayloadParams) => DAL.update(params);

const list = async (offset: number, limit: number, searchTerm: string) =>
  DAL.list(offset, limit, searchTerm);

const getById = async (id: number) => DAL.getById(id);

const deleteById = async (id: number) => DAL.deleteById(id);

export default {
  create,
  update,
  list,
  getById,
  deleteById,
};
