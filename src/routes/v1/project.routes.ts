import { RouteResolvers } from "../../interfaces/index";
import { Request, Response, NextFunction } from "express";
import { authenticate } from "../../middlewares/authenticate";
import ProjectController from "../../controllers/project.controller";
const resolvers: RouteResolvers[] = [
  {
    method: "post",
    route: "",
    middleware: [authenticate()],
    handler: (req: Request, res: Response, next: NextFunction) =>
      ProjectController.create(req.body),
    view: "create",
  },
  {
    method: "put",
    route: "",
    middleware: [authenticate()],
    handler: (req: Request, res: Response, next: NextFunction) =>
      ProjectController.update(req.body),
    view: "update",
  },
  {
    method: "get",
    route: "",
    middleware: [authenticate()],
    handler: (req: Request, res: Response, next: NextFunction) =>
      ProjectController.list(req.query),
    view: "list",
  },
  {
    method: "delete",
    route: "/:id",
    middleware: [authenticate()],
    handler: (req: Request, res: Response, next: NextFunction) =>
      ProjectController.deleteById(Number(req.params.id)),
    view: "login",
  },
];

export default {
  path: "/project",
  resolvers,
};
