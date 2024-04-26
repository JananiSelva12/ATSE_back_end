import { NextFunction, Request, Response } from "express";
import {
  InvalidTokenError,
  PermissionDeniedError,
  SessionExpiredError,
} from "../errors/index";
import { verifyJwt } from "../utils/jwt";
import redisClient from "../utils/connectRedis";
import UserService from "../services/user";

export function authenticate() {
  return async (req: Request, res: Response, next: NextFunction) => {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new PermissionDeniedError());
    }

    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      "jwt.accessTokenPrivateKey"
    );

    if (!decoded) {
      return next(new PermissionDeniedError());
    }

    // Check if the user has a valid session
    const session = await redisClient.get(decoded.sub.toString());

    if (!session) {
      return next(new SessionExpiredError());
    }

    // Check if the user still exist
    const user = await UserService.getByIdAnduserId(
      JSON.parse(session).id,
      JSON.parse(session).userId
    );

    if (!user) {
      return next(new InvalidTokenError());
    }

    // Add user to res.locals
    res.locals.user = user;
    return next();
  };
}
