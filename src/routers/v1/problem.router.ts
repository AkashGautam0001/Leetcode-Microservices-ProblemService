import express from "express";
import { ProblemController } from "../../controllers/problem.controller.js";
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

// const problemRepository = new ProblemRepository();
// const problemService = new ProblemService(problemRepository);
// const problemController = new ProblemController(problemService);

problemRouter.get("/", ProblemController.getAllProblems);
problemRouter.get(
  "/search",
  validateQueryParams(searchProblemsSchema),
  ProblemController.searchProblems,
);
problemRouter.get(
  "/difficulty/:difficulty",
  validatePathParams(findByDifficultySchema),
  ProblemController.findByDifficulty,
);
problemRouter.get("/:id", ProblemController.getProblemById);
problemRouter.post("/", ProblemController.createProblem);
problemRouter.put(
  "/:id",
  validateRequestBody(updateProblemSchema),
  ProblemController.updateProblem,
);
problemRouter.delete("/:id", ProblemController.deleteProblem);

export default problemRouter;
