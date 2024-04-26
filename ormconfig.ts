import {
  MYSQL_HOST,
} from "./src/config";
import { ConnectionOptions } from "typeorm";

const ORMConfig: ConnectionOptions = {
  name: "hk_db",
  type: "mysql",
  username: "root",
  password: "root",
  host: MYSQL_HOST,
  port: Number(3306),
  // host: "localhost",
  // port: Number(3307),
  database: "hk_db",
  synchronize: false,
  logging: false,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscriber",
  },
};

export = ORMConfig;
