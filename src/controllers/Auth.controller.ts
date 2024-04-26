import {
  ForgotPasswordPayload,
  LoginParams,
  ResetPasswordPayload,
  SignUpParams,
  SignUpRequestParams,
} from "../interfaces/auth";
import {
  errorResponseMessages,
  successResponseMessages,
} from "../utils/properties";
import {
  AccountSuspendedError,
  InvalidReqArgsError,
  PermissionDeniedError,
  WrongEmailPasswordError,
} from "../errors";
import PasswordHelper from "../utils/password";
import AuthService from "../services/auth";
import UserService from "../services/user";
import { UserRepository } from "../models";
import redisClient from "../utils/connectRedis";
import userController from "./User.controller";
import UserController from "./User.controller";

async function signUp(payload: SignUpRequestParams) {
  const hashedPassword = PasswordHelper.hashPassword(payload.password);

  console.log(payload);
  await userController.isEmailExists(payload.email);
 
  const signUpData: SignUpParams = {
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    phoneNo: payload.phoneNo,
    crypted_password: hashedPassword,
    country: payload.country,
    userId: payload.userId
  };

  const companyAndUserData = await AuthService.signUp(signUpData);

  return {
    data: companyAndUserData,
    message: successResponseMessages.SUCCESSFUL_USER_CREATION,
  };
}

async function login(loginParams: LoginParams) {
  const { userName, password } = loginParams;
  const user = await UserService.getByEmail(userName);
  console.log(user);
  if (!user) {
    throw new WrongEmailPasswordError({
      message: errorResponseMessages.WRONG_EMAIL_PASSWORD,
    });
  }

  const isValid: boolean = PasswordHelper.comparePassword(
    password,
    user.crypted_password
  );

  if (!isValid) {
    throw new WrongEmailPasswordError({
      message: errorResponseMessages.WRONG_EMAIL_PASSWORD,
    });
  }

  if (user.isActivated === false) {
    throw new AccountSuspendedError("User", {
      message: errorResponseMessages.SUSPENDED,
    });
  }

  const { access_token, refresh_token } = await AuthService.signTokens(user);

  return {
    message: successResponseMessages.SUCCESSFUL_LOGIN,
    access_token,
    refresh_token,
    logged_in: true,
    user
  };
}

async function forgotPassword(forgotPasswordParams: ForgotPasswordPayload) {
  const { email } = forgotPasswordParams;
  const generatedTemporaryPassword = await PasswordHelper.generatePassword();
  const hashedGeneratedTemporaryPassword = PasswordHelper.hashPassword(
    generatedTemporaryPassword
  );
}

async function resetPassword(resetParams: ResetPasswordPayload) {
  const { oldPassword, crypted_password, email, loginType } = resetParams;
  const user = await UserService.getByEmail(email);
  const hashedNewPassword = await PasswordHelper.hashPassword(crypted_password);
  const isValid: boolean = PasswordHelper.comparePassword(
    oldPassword,
    user?.crypted_password
  );

  if (!isValid) {
    throw new WrongEmailPasswordError({
      message: errorResponseMessages.WRONG_OLD_PASSWORD,
    });
  }

  if (!["admin"].includes(loginType)) {
    throw new InvalidReqArgsError({
      formError: [
        {
          key: "loginType",
          failValue: loginType,
          description: "Invalid login Type",
          message: errorResponseMessages.LOGIN_TYPE,
        },
      ],
    });
  }

  if (loginType === "admin") {
    const admin = await UserService.getByEmail(email);

    if (!admin) {
      throw new PermissionDeniedError();
    }

    await UserRepository().update(admin.id, {
      crypted_password: hashedNewPassword,
    });

    return {
      message: successResponseMessages.SUCCESSFUL_PASSWORD_UPDATE,
    };
  }
}

async function verifyEmail(verifyPayload: any) {
  const { userId, email, token } = verifyPayload;

  const user = await UserService.getByEmailAnduserId(email, userId);
  if (!user) {
    throw new WrongEmailPasswordError({
      message: errorResponseMessages.WRONG_EMAIL,
    });
  }

  if (user.verificationToken !== token) {
    throw new WrongEmailPasswordError({
      message: errorResponseMessages.WRONG_VERIFICATION_CODE,
    });
  }
  if (!user.verified) {
    await UserService.verifyUser(user.id, userId);
  }

  await UserController.removeVerificationTokenById(user.id, userId);

  return {
    message: successResponseMessages.SUCCESSFUL_EMAIL_VERIFICATION,
  };
}

async function logout(user: any) {
  await redisClient.del(String(user.id));

  return {
    message: "logout Successfully",
    access_token: "",
    refresh_token: "",
    logged_in: false,
  };
}

export default {
  login,
  signUp,
  verifyEmail,
  forgotPassword,
  logout,
  resetPassword,
};
