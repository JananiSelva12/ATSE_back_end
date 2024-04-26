import { DependencyError, NotFoundError, NotModifiedError } from "../errors";
import {
  errorResponseMessages,
  successResponseMessages,
} from "../utils/properties";
import UserService from "../services/user";
import {
  CreateProjectPayloadParams,
  UpdateProjectPayloadParams,
} from "../interfaces/project.interface";
import ProjectService from "../services/project";

async function create(payload: CreateProjectPayloadParams) {
  try {
    const project = await ProjectService.create(payload);
    return {
      data: project,
      message: successResponseMessages.SUCCESSFUL_PROJECT_CREATION,
    };
  } catch (e) {
    return {
      message: errorResponseMessages.CREATE_UNSUCCESSFUL,
    };
  }
}

async function update(payload: UpdateProjectPayloadParams) {
  const project = await ProjectService.getById(Number(payload.id));
  if (!project) {
    throw new NotFoundError("Project", {
      message: errorResponseMessages.NOT_FOUND,
    });
  }

  if (
    payload.name === project.name &&
    payload.address === project.address &&
    payload.project_type === project.project_type &&
    payload.employer_id === project.employer_id ) {
    throw new NotModifiedError("Project", {
      message: errorResponseMessages.NO_CHANGES,
    });
  }

  const updatedProject = await ProjectService.update(payload);

  return {
    data: updatedProject,
    message: successResponseMessages.SUCCESSFUL_PROJECT_UPDATE,
  };
}

async function list(params: any) {
  let { offset, limit, searchTerm } = params;

  const projects = await ProjectService.list(offset, limit, searchTerm);

  return {
    data: projects[0],
    total: projects[0].length,
  };
}

// async function getById(id: number) {
//   const user = await UserService.getById(id);

//   if (!user) {
//     throw new NotFoundError("User", {
//       message: "User" + errorResponseMessages.NOT_FOUND,
//     });
//   }

//   return user;
// }

async function deleteById(id: number) {
  const project = await ProjectService.getById(id);
  if (!project) {
    throw new NotFoundError("Project", {
      message: "Project" + errorResponseMessages.NOT_FOUND,
    });
  }

  try {
    await ProjectService.deleteById(id);
  } catch (error) {
    throw new DependencyError("Project", {
      message: errorResponseMessages.DELETE_UNSUCCESSFUL,
    });
  }

  return {
    message: successResponseMessages.SUCCESSFUL_PROJECT_DELETION,
  };
}

export default {
  create,
  update,
  list,
  deleteById,
};
