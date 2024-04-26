import { Request, Response, NextFunction } from "express";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/jwt";

export default (
    routeHandler: (
      request: Request,
      response: Response,
      nextFn: NextFunction
    ) => Promise<any>,
    view: string
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await routeHandler(req, res, next);
      if (!results || !results._skipResponse) {
        if (results.hasOwnProperty("logged_in") && results.logged_in) {
          res.cookie("logged_in", true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
          });
          res.cookie("access_token", results.access_token, {
            ...accessTokenCookieOptions,
            httpOnly: false,
          });
          res.cookie("refresh_token", results.refresh_token, {
            ...refreshTokenCookieOptions,
            httpOnly: false,
          });
        } else if (results.hasOwnProperty("logged_in") && !results.logged_in) {
          res.cookie("logged_in", results.logged_in, { maxAge: 1 });
          res.cookie("access_token", results.access_token, { maxAge: 1 });
          res.cookie("refresh_token", results.refresh_token, { maxAge: 1 });
        }

        return res.send(results);
      }
    } catch (e: any) {
      return next(e);
    }
  };
