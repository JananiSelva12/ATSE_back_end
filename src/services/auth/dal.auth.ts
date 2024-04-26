import { QueryRunner } from "typeorm";
import { SignUpParams } from "../../interfaces/auth";
import {
  hkQueryRunner,
  Users,
} from "../../models";
import { errorResponseMessages } from "../../utils/properties";
const crypto = require("crypto");

const signUp = async (params: SignUpParams) => {
  const {
    country,
    crypted_password,
    email,
    first_name,
    last_name,
    phoneNo,
  } = params;

  const queryRunner: QueryRunner = hkQueryRunner();
  await queryRunner.startTransaction();
  try {
    // const user = new User()
    // user.country = country;
    // user.email = email;

    // const newUser = await queryRunner.manager
    //   .getRepository(User)
    //   .save(user);

    // Generate a random verification token
    const generateVerificationToken = () => {
      // Generate a 32-character hexadecimal token
      const token = crypto.randomBytes(16).toString("hex");
      return token;
    };
    const verificationToken = generateVerificationToken();

    const users = new Users();
    users.first_name = first_name;
    users.last_name = last_name;
    users.email = email;
    users.phoneNo = phoneNo;
    users.crypted_password = crypted_password;
    users.login = email;
    users.created_at = new Date();
    users.updated_at = new Date();
    // user.userId = newCompany.userId;
    users.verificationToken = verificationToken;
    users.ownerAccount = true;

    const newUsers = await queryRunner.manager.getRepository(Users).save(users);

    await queryRunner.commitTransaction();

    return { users: newUsers };
  } catch (error) {
    console.log(error);

    await queryRunner.rollbackTransaction();
    throw {
      error,
      message: errorResponseMessages.USER_COMPANY_CREATION_UNSUCCESSFUL,
    };
  } finally {
    await queryRunner.release();
  }
};

export default {
  signUp,
};
