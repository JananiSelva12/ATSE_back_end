import { RouteResolvers } from "../../interfaces/index";
import { Request, Response, NextFunction } from "express";
import UserController from "../../controllers/User.controller";
import { authenticate } from "../../middlewares/authenticate";
const resolvers: RouteResolvers[] = [
  {
    method: "get",
    route: "/me/:email",
    middleware: [authenticate()],
    handler: (req: Request, res: Response, next: NextFunction) =>
      UserController.getByEmail(req.params.email, res.locals.user.userId),
    view: "getByEmail",
  },
];

export default {
  path: "/user",
  resolvers,
};
