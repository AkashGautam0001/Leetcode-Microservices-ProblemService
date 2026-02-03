import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import logger from "../config/logger.config.js";

export const validateRequestBody = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      logger.info(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        message: "Invalid request body",
        success: false,
        error: error,
      });
    }
  };
};

export const validateQueryParams = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      logger.info(req.query);
      next();
    } catch (error) {
      res.status(400).json({
        message: "Invalid request query parameters",
        success: false,
        error: error,
      });
    }
  };
};

export const validatePathParams = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.params);
      logger.info(req.params);
      next();
    } catch (error) {
      res.status(400).json({
        message: "Invalid request path parameters",
        success: false,
        error: error,
      });
    }
  };
};
