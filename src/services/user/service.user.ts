import { UserParams } from "../../interfaces/auth";
import { UpdatedUser } from "../../interfaces/user.interface";
import DAL from "./dal.user";

const create = async (params: UserParams) => DAL.create(params);

const update = async (params: UpdatedUser) => DAL.update(params);

const list = async (
  offset: number,
  limit: number,
  q: string,
  userId: number
) => DAL.list(offset, limit, q, userId);

const getByIdAnduserId = async (id: number, userId: number) =>
  DAL.getByIdAnduserId(id, userId);

const verifyUser = async (id: number, userId: number) =>
  DAL.verifyUser(id, userId);

const getByEmail = async (email: string) => DAL.getByEmail(email);

const getByEmailAnduserId = async (email: string, userId: number) =>
  DAL.getByEmailAnduserId(email, userId);

const updateIsActivate = async (id: number, isActivate: boolean) =>
  DAL.updateIsActivate(id, isActivate);

const getUserVerification = async (verificationToken: string, email: string) =>
  DAL.getUserVerification(verificationToken, email);

const deleteById = async (id: number, userId: number) =>
  DAL.deleteById(id, userId);

const removeVerificationTokenById = async (id: number, userId: number) =>
  DAL.removeVerificationTokenById(id, userId);

const isEmailExists = async (email: string) => {
  const user = await DAL.getByEmail(email);

  return user !== undefined ? true : false;
};

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
  isEmailExists,
};
