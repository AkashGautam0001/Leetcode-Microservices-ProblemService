import { Request, Response } from "express";
import { IProblemService } from "../services/problem.service.js";

export interface IProblemController {
  createProblem(req: Request, res: Response): Promise<void>;
  getProblemById(req: Request, res: Response): Promise<void>;
  getAllProblems(req: Request, res: Response): Promise<void>;
  updateProblem(req: Request, res: Response): Promise<void>;
  deleteProblem(req: Request, res: Response): Promise<void>;
  findByDifficulty(req: Request, res: Response): Promise<void>;
  searchProblems(req: Request, res: Response): Promise<void>;
}

export class ProblemController implements IProblemController {
  private problemService: IProblemService;

  constructor(problemService: IProblemService) {
    this.problemService = problemService;
  }

  async createProblem(req: Request, res: Response): Promise<void> {
    const newProblem = await this.problemService.createProblem(req.body);
    res.status(201).json({
      message: "Problem created successfully",
      problem: newProblem,
      success: true,
    });
  }

  async getProblemById(req: Request, res: Response): Promise<void> {
    const problem = await this.problemService.getProblemById(req.params.id);
    if (!problem) {
      res.status(404).json({ message: "Problem not found", success: false });
      return;
    }
    res.status(200).json({ problem, success: true });
  }
  async getAllProblems(_req: Request, res: Response): Promise<void> {
    const problems = await this.problemService.getAllProblems();
    res.status(200).json({ problems, success: true });
  }
  async updateProblem(req: Request, res: Response): Promise<void> {
    const updatedProblem = await this.problemService.updateProblem(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      message: "Problem updated successfully",
      problem: updatedProblem,
      success: true,
    });
  }

  async deleteProblem(req: Request, res: Response): Promise<void> {
    const deleted = await this.problemService.deleteProblem(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Problem not found", success: false });
      return;
    }
    res
      .status(200)
      .json({ message: "Problem deleted successfully", success: true });
  }

  async findByDifficulty(req: Request, res: Response): Promise<void> {
    const difficulty = req.params.difficulty as "easy" | "medium" | "hard";
    const problems = await this.problemService.findByDifficulty(difficulty);
    res.status(200).json({ problems, success: true });
  }

  async searchProblems(req: Request, res: Response): Promise<void> {
    const query = req.query.q as string;
    const problems = await this.problemService.searchProblems(query);
    res.status(200).json({ problems, success: true });
  }
}
