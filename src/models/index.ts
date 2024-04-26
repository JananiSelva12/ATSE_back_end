import { getConnection, getRepository } from "typeorm";
import { Users } from "./users";
import { Announcements } from "./announcements";

const UserRepository = () => getRepository(Users, "hk_db");
const hkQueryRunner = () => getConnection("hk_db").createQueryRunner();

export {
  hkQueryRunner,
  UserRepository,
  Users,
};
