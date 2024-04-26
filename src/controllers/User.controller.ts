import {
  DependencyError,
  DuplicateError,
  NotFoundError,
  NotModifiedError,
} from "../errors";
import {
  errorResponseMessages,
  successResponseMessages,
} from "../utils/properties";
import UserService from "../services/user";
import { Users } from "../models";
import { UserParams } from "../interfaces/auth";
import PasswordHelper from "../utils/password";
import config from "config";
import { difference } from "lodash";
import {
  CreateUserPayloadParams,
  UpdateUserPayloadParams,
  UpdatedUser,
} from "../interfaces/user.interface";
// import { ListingQuery } from "../interfaces";

async function create(payload: CreateUserPayloadParams, userId: number) {
  const hashedPassword = PasswordHelper.hashPassword(payload.crypted_password);

  const userPayload: UserParams = {
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    phoneNo: payload.phoneNo,
    crypted_password: hashedPassword,
    is_marketing: false,
    userId: userId,
    role_ids: payload.role_ids,
  };

  await isEmailExists(payload.email);

  const userData = await UserService.create(userPayload);


  return {
    data: userData,
    message: successResponseMessages.SUCCESSFUL_USER_CREATION,
  };
}

// async function update(payload: UpdateUserPayloadParams, userId: number) {
//   const user = await UserService.getByIdAnduserId(
//     Number(payload.id),
//     userId
//   );

//   const existingRolesData = await RoleUserService.getRolesByUserId(payload.id);

//   const existingRoleIds: number[] = existingRolesData.map(
//     (role) => role.role_id
//   );

//   const newRoles = difference(payload.role_ids, existingRoleIds);
//   const removedRoles = difference(existingRoleIds, payload.role_ids);

//   if (
//     payload.first_name === user?.first_name &&
//     payload.last_name === user?.last_name &&
//     payload.phoneNo === user?.phoneNo &&
//     newRoles.length === 0 &&
//     removedRoles.length === 0
//   ) {
//     throw new NotModifiedError("User", {
//       message: errorResponseMessages.NO_CHANGES,
//     });
//   }

//   const updatedUserPayload: UpdatedUser = {
//     id: payload?.id,
//     first_name: payload.first_name,
//     last_name: payload.last_name,
//     phoneNo: payload.phoneNo,
//     newRoles,
//     removedRoles,
//   };

//   const updatedUserData = await UserService.update(updatedUserPayload);

//   return {
//     data: updatedUserData,
//     message: successResponseMessages.SUCCESSFUL_USER_UPDATE,
//   };
// }

// async function list(params: ListingQuery, userId: number) {
//   let { offset, limit, q } = params;

//   offset = offset ? offset : 0;
//   limit = limit ? limit : 10;
//   q = q ? q : "";

//   const users = await UserService.list(offset, limit, q, userId);

//   return {
//     data: users[0],
//     total: users[0].length,
//   };
// }

// async function getByIdAnduserId(id: number, userId: number) {
//   const user = await UserService.getByIdAnduserId(id, userId);

//   if (!user) {
//     throw new NotFoundError("User", {
//       message: "User" + errorResponseMessages.NOT_FOUND,
//     });
//   }

//   return { data: user };
// }

async function getByEmail(email: string, userId: number) {
  const user = await UserService.getByEmailAnduserId(email, userId);

  if (!user) {
    throw new NotFoundError("User", {
      message: "User" + errorResponseMessages.NOT_FOUND,
    });
  }

  return user;
}

// async function updateIsActivate(id: number, logged_in_user: Users) {
//   if (logged_in_user.id === id) {
//     throw new DependencyError("User", {
//       message: errorResponseMessages.YOU_CANT_SUSPEND_YOU,
//     });
//   }

//   const user = await UserService.getByIdAnduserId(
//     id,
//     logged_in_user.userId
//   );
//   if (!user) {
//     throw new NotFoundError("User", {
//       message: "User" + errorResponseMessages.NOT_FOUND,
//     });
//   }

//   try {
//     await UserService.updateIsActivate(id, user?.isActivated);
//     return {
//       message: user?.isActivated
//         ? successResponseMessages.SUCCESSFUL_USER_SUSPENDED
//         : successResponseMessages.SUCCESSFUL_USER_ACTIVATION,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function deleteById(id: number, logged_in_user: Users) {
//   const user = await UserService.getByIdAnduserId(
//     id,
//     logged_in_user.userId
//   );
//   if (!user) {
//     throw new NotFoundError("User", {
//       message: "User" + errorResponseMessages.NOT_FOUND,
//     });
//   }

//   if (id === logged_in_user.id) {
//     throw new NotFoundError("User", {
//       message: "User" + errorResponseMessages.YOU_CANT_DELETE_YOU,
//     });
//   }

//   const superAdminRoleId = await RoleService.getSuperAdminRoleId();
//   if (id === superAdminRoleId) {
//     throw new DependencyError("User", {
//       message: "User" + errorResponseMessages.CANT_DELETE_SUPER_ADMIN,
//     });
//   }
//   try {
//     await UserService.deleteById(id, logged_in_user.userId);
//   } catch (error) {
//     throw new DependencyError("User", {
//       message: errorResponseMessages.ERROR_IN_USER_DELETION,
//     });
//   }

//   return {
//     message: successResponseMessages.SUCCESSFUL_USER_DELETED,
//   };
// }

async function removeVerificationTokenById(id: number, userId: number) {
  const user = await UserService.getByIdAnduserId(id, userId);
  if (!user) {
    throw new NotFoundError("User", {
      message: "User" + errorResponseMessages.NOT_FOUND,
    });
  }

  try {
    await UserService.removeVerificationTokenById(id, userId);
  } catch (error) {
    throw new DependencyError("User", {
      message: errorResponseMessages.ERROR_IN_USER_DELETION,
    });
  }

  return {
    message: successResponseMessages.SUCCESSFUL_USER_DELETED,
  };
}

const isEmailExists = async (params: any) => {
  const { email } = params;
  const isUserEmailExists = await UserService.isEmailExists(email);
  if (isUserEmailExists) {
    throw new DuplicateError("User", {
      message: errorResponseMessages.USER_MAIL_DUPLICATE,
    });
  } else {
    return false;
  }
};

export default {
  // create,
  // update,
  // list,
  // getByIdAnduserId,
  getByEmail,
  // deleteById,
  // updateIsActivate,
  isEmailExists,
  removeVerificationTokenById,
};
