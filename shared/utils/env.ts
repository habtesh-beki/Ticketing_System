import { configDotenv } from "dotenv";
configDotenv();
export const ENV = {
  port: process.env.PORT,
  dbConnection: process.env.DB_CONNECTION,
  authSecretKey: process.env.AUTH_SECRET_KEY,
};
