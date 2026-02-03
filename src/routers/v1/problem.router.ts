import express from "express";
import { ProblemController } from "../../controllers/problem.controller.js";
import { ProblemService } from "../../services/problem.service.js";
import { ProblemRepository } from "../../repositories/problem.repository.js";
import {
  validatePathParams,
  validateQueryParams,
  validateRequestBody,
} from "../../validators/index.js";
import {
  createProblemSchema,
  findByDifficultySchema,
  searchProblemsSchema,
  updateProblemSchema,
} from "../../validators/problem.validator.js";

const problemRouter = express.Router();

const problemRepository = new ProblemRepository();
const problemService = new ProblemService(problemRepository);
const problemController = new ProblemController(problemService);

problemRouter.get(
  "/",
  validateRequestBody(createProblemSchema),
  problemController.getAllProblems,
);
problemRouter.get(
  "/search",
  validateQueryParams(searchProblemsSchema),
  problemController.searchProblems,
);
problemRouter.get(
  "/difficulty/:difficulty",
  validatePathParams(findByDifficultySchema),
  problemController.findByDifficulty,
);
problemRouter.get("/:id", problemController.getProblemById);
problemRouter.post("/", problemController.createProblem);
problemRouter.put(
  "/:id",
  validateRequestBody(updateProblemSchema),
  problemController.updateProblem,
);
problemRouter.delete("/:id", problemController.deleteProblem);

export default problemRouter;
