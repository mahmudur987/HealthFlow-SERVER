import dotenv from "dotenv";
import path from "path";
import { jwt } from "zod";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  jwt_refresh_key: process.env.JWT_SECRET_KEY_REFRESH,
  jwt_refresh_expires_in: process.env.JWT_EXPIRES_IN_REFRESH,
};
