import { config } from "dotenv";
config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } =
  process.env;
export const {
  MYSQL_USER,
  MYSQL_ROOT_PASSWORD,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
} = process.env;

export const { REDIS_HOST, REDIS_PORT } = process.env;
