import { CreateProblemDto, UpdateProblemDto } from "../dtos/problem.dto.js";
import { sanitizeMarkdown } from "../helpers/markdown.sanitizer.js";
import { IProblem } from "../models/problem.model.js";
import { IProblemRepository } from "../repositories/problem.repository.js";
import { BadRequestError } from "../utils/errors/app.error.js";

export interface IProblemService {
  createProblem(problemData: CreateProblemDto): Promise<IProblem>;
  getProblemById(id: string): Promise<IProblem | null>;
  getAllProblems(): Promise<{ problems: IProblem[]; total: number }>;
  updateProblem(
    id: string,
    updateData: UpdateProblemDto,
  ): Promise<IProblem | null>;
  deleteProblem(id: string): Promise<boolean>;
  findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]>;
  searchProblems(query: string): Promise<IProblem[]>;
}

export class ProblemService implements IProblemService {
  private problemRepository: IProblemRepository;

  constructor(problemRepository: IProblemRepository) {
    // contructor based dependency injection
    this.problemRepository = problemRepository;
  }

  async createProblem(problem: CreateProblemDto): Promise<IProblem> {
    const sanitizedPayload = { ...problem };
    if (problem.description) {
      sanitizedPayload.description = await sanitizeMarkdown(
        problem.description,
      );
    }
    if (problem.editorial) {
      sanitizedPayload.editorial = await sanitizeMarkdown(problem.editorial);
    }
    return this.problemRepository.createProblem(sanitizedPayload);
  }

  async getProblemById(id: string): Promise<IProblem | null> {
    const problem = await this.problemRepository.getProblemById(id);
    // if (!problem) {
    //   throw new Error("Problem not found");
    // }
    return problem;
  }

  async getAllProblems(): Promise<{ problems: IProblem[]; total: number }> {
    return this.problemRepository.getAllProblems();
  }

  async updateProblem(
    id: string,
    updateData: UpdateProblemDto,
  ): Promise<IProblem | null> {
    const problem = await this.problemRepository.getProblemById(id);
    if (!problem) {
      throw new Error("Problem not found");
    }

    const sanitizedPayload: Partial<IProblem> = { ...updateData };
    if (updateData.description) {
      sanitizedPayload.description = await sanitizeMarkdown(
        updateData.description,
      );
    }
    if (updateData.editorial) {
      sanitizedPayload.editorial = await sanitizeMarkdown(updateData.editorial);
    }
    return await this.problemRepository.updateProblem(id, sanitizedPayload);
  }

  async deleteProblem(id: string): Promise<boolean> {
    const deleted = await this.problemRepository.deleteProblem(id);
    return deleted;
  }

  async findByDifficulty(
    difficulty: "easy" | "medium" | "hard",
  ): Promise<IProblem[]> {
    return this.problemRepository.findByDifficulty(difficulty);
  }

  async searchProblems(query: string): Promise<IProblem[]> {
    if (!query || query.trim() === "") {
      throw new BadRequestError("Query is required");
    }
    return this.problemRepository.searchProblems(query);
  }
}
