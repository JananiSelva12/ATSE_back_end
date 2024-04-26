import { NextFunction, Router, Response, Request, response } from "express";
import { RouteResolvers, Api } from "../../interfaces/index";
import ResponseViewWrapper from "../../utils/ResponseViwerWrapper";
import fs from "fs";
import config from "config";

/**
 * Read all route files from current directory
 */
const routes = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      (!(file.indexOf(".ts") > -1) ||
        process.env.NODE_ENV !== config.get("env.prod")) &&
      !(file.indexOf(".js.map") > -1) &&
      !(file.indexOf("index") > -1)
  )
  .map((file) => require(`${__dirname}/${file}`));

/**
 * Register all route resolvers to express router
 */
const registeredRoutes: Api[] = [];
const excludedRoutes = ["/notifications"];
routes.forEach((route) => {
  // Skip index.ts
  if (route.default) {
    const { path, resolvers } = route.default;

    const router: Router = Router();

    resolvers.forEach((resolver: RouteResolvers) => {
      router[resolver.method](
        resolver.route,
        ...resolver.middleware,
        (req: Request, res: Response, next: NextFunction) => {
          // skip notifications to avoid flooding logs

          ResponseViewWrapper(resolver.handler, resolver.view)(req, res, next);
        }
      );
    });

    registeredRoutes.push({
      path,
      childRoutes: router,
    });
  }
});

export default registeredRoutes;
