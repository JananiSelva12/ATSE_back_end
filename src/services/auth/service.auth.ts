import config from "config";
import { signJwt } from "../../utils/jwt";
import { Users } from "../../models/users";
import redisClient from "../../utils/connectRedis";
import { SignUpParams } from "../../interfaces/auth";
import DAL from "./dal.auth";

const signUp = async (payload: SignUpParams) => DAL.signUp(payload);

const signTokens = async (
  user: Users
): Promise<{ access_token: string; refresh_token: string }> => {
  // 1. Create Session
  try {
    await redisClient.set(user.id.toString(), JSON.stringify(user), {
      EX: config.get<number>("redisCacheExpiresIn"),
    });
  } catch (error) {
    console.log("redis error : ", error);
  }

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, "jwt.accessTokenPrivateKey", {
    expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
  });

  const refresh_token = signJwt(
    { sub: user.id },
    "jwt.refreshTokenPrivateKey",
    {
      expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
    }
  );

  return { access_token, refresh_token };
};

export default {
  signUp,
  signTokens,
};
