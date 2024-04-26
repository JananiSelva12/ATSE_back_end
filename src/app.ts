import "reflect-metadata";
import express from "express";
import routes from "./routes/index";
import ORMConfig from "../ormconfig";
import { createConnection } from "typeorm";
import { Api } from "./interfaces";
import { logger, stream } from "./utils/logger";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import { NODE_ENV, PORT, LOG_FORMAT } from "./config/index";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public viewEngine = require("express-json-views");

  constructor() {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 4000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes.v1);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await createConnection(ORMConfig);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(String(LOG_FORMAT), { stream }));
    this.app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
    this.app.use(hpp());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

    /**
     * Setup View Engine
     */
    // this.app.engine("json", this.viewEngine({}));
    // this.app.set("views", `views/responses`);
    // this.app.set("view engine", "json");
  }

  private initializeRoutes(routes: Api[]) {
    const routesSetup = (versionedApi: Api[], versionPrefix?: string) => {
      versionedApi.forEach((route) => {
        const path = versionPrefix
          ? `/${versionPrefix}${route.path}`
          : route.path;
        this.app.use(path, route.childRoutes);
      });
    };
    routesSetup(routes);
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
