import mongoose from "mongoose";
import { serverConfig } from "./index.js";
import logger from "./logger.config.js";

export const connectDB = async () => {
  try {
    const dbURI = serverConfig.DB_URI;

    await mongoose.connect(dbURI);

    logger.info("Connected to MongoDB successfully");

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB connection error:", err);
      process.exit(1);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
