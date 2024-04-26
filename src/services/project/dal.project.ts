import { ProjectRepo } from "../../models";
import { Brackets } from "typeorm";
import {
  CreateProjectPayloadParams,
  UpdateProjectPayloadParams,
} from "../../interfaces/project.interface";

const create = async (params: CreateProjectPayloadParams) =>
  ProjectRepo().save(params);

const update = async (params: UpdateProjectPayloadParams) =>
  ProjectRepo().save(params);

const list = async (offset: number, limit: number, searchTerm: string) =>
  ProjectRepo()
    .createQueryBuilder("projects")
    .leftJoinAndSelect("projects.employer", "employer")
    .leftJoinAndSelect("projects.contractor", "contractor")
    .andWhere(
      new Brackets((and) => {
        and.orWhere("projects.name like :name", {
          name: `%${searchTerm}%`,
        });
        and.orWhere("projects.address like :address", {
          address: `%${searchTerm}%`,
        });
        and.orWhere("projects.project_type like :project_type", {
          project_type: `%${searchTerm}%`,
        });
        and.orWhere("employer.name like :employerName", {
          employerName: `%${searchTerm}%`,
        });
        and.orWhere("contractor.name like :contractorName", {
          contractorName: `%${searchTerm}%`,
        });
      })
    )
    .orderBy("projects.created_at", "DESC")
    .take(limit)
    .skip(offset * limit)
    .getManyAndCount();

const getById = async (id: number) => ProjectRepo().findOne({ where: { id } });

const deleteById = async (id: number) =>
  await ProjectRepo().delete({
    id,
  });

export default {
  create,
  update,
  list,
  getById,
  deleteById,
};
