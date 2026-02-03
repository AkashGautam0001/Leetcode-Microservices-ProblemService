import dotenv from "dotenv";
import logger from "./logger.config.js";

type ServerConfig = {
  PORT: number;
  DB_URI: string;
};

export function loadEnv() {
  dotenv.config();
  logger.info("Environment variables loaded");
}

loadEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3001,
  DB_URI:
    process.env.DB_URI || "mongodb://localhost:27017/leetcode_problems_db",
};
