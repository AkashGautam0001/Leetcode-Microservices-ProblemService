import express from "express";
import { pingHandler } from "../../controllers/ping.controller.js";

const pingRouter = express.Router();

pingRouter.get("/ping", pingHandler);

export default pingRouter;
