import { Users } from "../../models/users";
import { hkQueryRunner, UserRepository } from "../../models";
import { errorResponseMessages } from "../../utils/properties";
import { Brackets, QueryRunner } from "typeorm";
import { UserParams } from "../../interfaces/auth";
import crypto from "crypto";
import { UpdatedUser } from "../../interfaces/user.interface";

const create = async (params: UserParams) => {
  const {
    userId,
    crypted_password,
    email,
    first_name,
    last_name,
    phoneNo,
    is_marketing,
    role_ids,
  } = params;
  const queryRunner: QueryRunner = hkQueryRunner();
  await queryRunner.startTransaction();
  try {
    // Generate a random verification token
    const generateVerificationToken = () => {
      // Generate a 32-character hexadecimal token
      const token = crypto.randomBytes(16).toString("hex");
      return token;
    };
    const verificationToken = generateVerificationToken();

    const user = new Users();
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.crypted_password = crypted_password;
    user.created_at = new Date();
    user.updated_at = new Date();
    user.userId = userId;
    user.login = email;
    user.verificationToken = verificationToken;
    user.is_marketing = is_marketing;
    user.phoneNo = phoneNo;

    const newUser = await queryRunner.manager.getRepository(Users).save(user);

    await queryRunner.commitTransaction();

    return { user: newUser };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw {
      error,
      message: errorResponseMessages.USER_COMPANY_CREATION_UNSUCCESSFUL,
    };
  } finally {
    await queryRunner.release();
  }
};

const update = async (params: UpdatedUser) => {
  const { id, first_name, last_name, phoneNo, newRoles, removedRoles } = params;

  const queryRunner: QueryRunner = hkQueryRunner();
  await queryRunner.startTransaction();

  try {
    const user = new Users();
    user.id = id;
    user.first_name = first_name;
    user.last_name = last_name;
    user.phoneNo = phoneNo;

    const newUser = await queryRunner.manager.getRepository(Users).save(user);
    
    const updatedUser = await UserRepository()
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .leftJoin("user.role_users", "role_users")
      .leftJoinAndSelect("role_users.role", "role")
      .getOne();

    await queryRunner.commitTransaction();
    return { user: updatedUser };
  } catch (error) {
    await queryRunner.rollbackTransaction();

    throw {
      error,
      message: errorResponseMessages.USER_COMPANY_CREATION_UNSUCCESSFUL,
    };
  } finally {
    await queryRunner.release();
  }
};

const list = async (
  offset: number,
  limit: number,
  q: string,
  userId: number
) =>
  UserRepository()
    .createQueryBuilder("users")
    .where({ userId })
    .andWhere(
      new Brackets((and) => {
        and.orWhere("users.first_name like :firstName", {
          firstName: `%${q}%`,
        });
        and.orWhere("users.last_name like :lastName", {
          lastName: `%${q}%`,
        });
        and.orWhere("users.email like :email", {
          email: `%${q}%`,
        });
      })
    )
    .orderBy("users.created_at", "DESC")
    .take(limit)
    .skip(offset * limit)
    .getManyAndCount();

const getByIdAnduserId = async (id: number, userId: number) =>
  UserRepository()
    .createQueryBuilder("user")
    .where("user.id = :id", { id })
    .andWhere("user.userId = :userId", { userId })
    .leftJoin("user.role_users", "role_users")
    .addSelect(["role_users.user_id", "role_users.role_id"])
    .leftJoin("role_users.role", "role")
    .addSelect(["role.id", "role.name"])
    .getOne();

const getByEmail = async (email: string) =>
  UserRepository().findOne({
    where: {
      email,
    },
  });

const getByEmailAnduserId = async (email: string, userId: number) =>
  UserRepository().findOne({
    where: {
      email,
      userId,
    },
  });

const verifyUser = async (id: number, userId: number) =>
  UserRepository().update(
    { id: userId, userId },
    {
      verified: true,
    }
  );

const updateIsActivate = async (id: number, isActivated: boolean) =>
  UserRepository().update(id, {
    isActivated: !isActivated,
  });

const getUserVerification = async (
  verificationToken: string,
  email: string
) => {
  const queryBuilder = UserRepository()
    .createQueryBuilder("users")
    .where("email = :email", { email })
    .andWhere("verificationToken = :verificationToken", { verificationToken })
    .getOne();
  return queryBuilder;
};

const deleteById = async (id: number, userId: number) =>
  await UserRepository().delete({
    id: userId,
    userId,
  });

const removeVerificationTokenById = async (id: number, userId: number) =>
  await UserRepository().update(
    { id: userId, userId },
    {
      verificationToken: "",
    }
  );

export default {
  create,
  update,
  list,
  getByIdAnduserId,
  getByEmail,
  getByEmailAnduserId,
  verifyUser,
  getUserVerification,
  updateIsActivate,
  deleteById,
  removeVerificationTokenById,
};
