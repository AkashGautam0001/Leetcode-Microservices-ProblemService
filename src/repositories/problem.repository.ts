import { IProblem, Problem } from "../models/problem.model.js";

export interface IProblemRepository {
  // Define repository methods here
  createProblem(problem: Partial<IProblem>): Promise<IProblem>;
  getProblemById(id: string): Promise<IProblem | null>;
  getAllProblems(): Promise<{ problems: IProblem[]; total: number }>;
  updateProblem(
    id: string,
    updateData: Partial<IProblem>,
  ): Promise<IProblem | null>;
  deleteProblem(id: string): Promise<boolean>;
  findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]>;
  searchProblems(query: string): Promise<IProblem[]>;
}

export class ProblemRepository implements IProblemRepository {
  // Implementation of repository methods will go here
  async createProblem(problem: Partial<IProblem>): Promise<IProblem> {
    const newProblem = new Problem(problem);
    return await newProblem.save();
  }

  async getProblemById(id: string): Promise<IProblem | null> {
    const problem = await Problem.findById(id);
    if (!problem) {
      return null;
    }
    return problem;
  }

  async getAllProblems(): Promise<{ problems: IProblem[]; total: number }> {
    const problems = await Problem.find();
    if (!problems) {
      return { problems: [], total: 0 };
    }
    return { problems, total: problems.length };
  }

  async updateProblem(
    id: string,
    updateData: Partial<IProblem>,
  ): Promise<IProblem | null> {
    return await Problem.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProblem(id: string): Promise<boolean> {
    const result = await Problem.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  async findByDifficulty(
    difficulty: "easy" | "medium" | "hard",
  ): Promise<IProblem[]> {
    return await Problem.find({ difficulty });
  }

  async searchProblems(query: string): Promise<IProblem[]> {
    const regex = new RegExp(query, "i");
    return await Problem.find({
      $or: [{ title: regex }, { description: regex }],
    });
  }
}
