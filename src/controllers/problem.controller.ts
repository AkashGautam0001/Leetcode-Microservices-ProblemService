import { Request, Response } from "express";
import {
  IProblemService,
  ProblemService,
} from "../services/problem.service.js";
import {
  IProblemRepository,
  ProblemRepository,
} from "../repositories/problem.repository.js";

const problemRepository: IProblemRepository = new ProblemRepository();
const problemService: IProblemService = new ProblemService(problemRepository);

export const ProblemController = {
  async createProblem(req: Request, res: Response): Promise<void> {
    const newProblem = await problemService.createProblem(req.body);
    res.status(201).json({
      message: "Problem created successfully",
      data: newProblem,
      success: true,
    });
  },

  async getProblemById(req: Request, res: Response): Promise<void> {
    const problem = await problemService.getProblemById(req.params.id);
    if (!problem) {
      res.status(404).json({ message: "Problem not found", success: false });
      return;
    }
    res.status(200).json({
      message: "Problem found successfully",
      data: problem,
      success: true,
    });
  },
  async getAllProblems(_req: Request, res: Response): Promise<void> {
    const problems = await problemService.getAllProblems();
    res.status(200).json({ data: problems, success: true });
  },
  async updateProblem(req: Request, res: Response): Promise<void> {
    const updatedProblem = await problemService.updateProblem(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      message: "Problem updated successfully",
      data: updatedProblem,
      success: true,
    });
  },

  async deleteProblem(req: Request, res: Response): Promise<void> {
    const deleted = await problemService.deleteProblem(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Problem not found", success: false });
      return;
    }
    res
      .status(200)
      .json({ message: "Problem deleted successfully", success: true });
  },

  async findByDifficulty(req: Request, res: Response): Promise<void> {
    const difficulty = req.params.difficulty as "easy" | "medium" | "hard";
    const problems = await problemService.findByDifficulty(difficulty);
    res
      .status(200)
      .json({
        message: "Problems found successfully",
        data: problems,
        success: true,
      });
  },

  async searchProblems(req: Request, res: Response): Promise<void> {
    const query = req.query.q as string;
    const problems = await problemService.searchProblems(query);
    res
      .status(200)
      .json({
        message: "Problems found successfully",
        data: problems,
        success: true,
      });
  },
};
