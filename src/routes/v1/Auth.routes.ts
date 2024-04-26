import { RouteResolvers } from "../../interfaces/index";
import { Request, Response, NextFunction } from "express";
import AuthController from "../../controllers/Auth.controller";
import { authenticate } from "../../middlewares/authenticate";
import UserController from "../../controllers/User.controller";

const resolvers: RouteResolvers[] = [
  {
    method: "post",
    route: "/login",
    middleware: [],
    handler: (req: Request, res: Response, next: NextFunction) =>
      AuthController.login(req.body),
    view: "login",
  },
  {
    method: "post",
    route: "/sign_up",
    middleware: [],
    handler: (req: Request, res: Response, next: NextFunction) =>
      AuthController.signUp(req.body),
    view: "create",
  },
  {
    method: "get",
    route: "/verification",
    middleware: [],
    handler: (req: Request, res: Response, next: NextFunction) =>
      AuthController.verifyEmail(req.query),
    view: "verification",
  },
  // {
  //   method: "post",
  //   route: "/refresh-access-token",
  //   middleware: [],
  //   handler: (req: Request, res: Response, next: NextFunction) =>
  //     AuthController.refreshAccessToken(
  //       req.cookies.refresh_token,
  //       req.params.loginType
  //     ),
  //   view: "refreshTokenGenerate",
  // },
  {
    method: "post",
    route: "/forgot-password",
    middleware: [],
    handler: (req: Request, res: Response, next: NextFunction) =>
      AuthController.forgotPassword(req.body),
    view: "forgot",
  },
  {
    method: "post",
    route: "/reset-password",
    middleware: [],
    handler: (req: Request, res: Response, next: NextFunction) =>
      AuthController.resetPassword(req.body),
    view: "reset",
  },
  {
    method: "get",
    route: "/isEmailExists",
    middleware: [],
    handler: (req: Request, res: Response, next: NextFunction) =>
      UserController.isEmailExists(req.query),
    view: "isEmailExists",
  },
  {
    method: "post",
    route: "/logout",
    middleware: [authenticate()],
    handler: (req: Request, res: Response, next: NextFunction) =>
      AuthController.logout(res.locals.user),
    view: "logout",
  },
];

export default {
  path: "/session",
  resolvers,
};
