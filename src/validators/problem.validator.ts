import { z } from "zod";

const testCaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  output: z.string().min(1, "Output is required"),
});

export const createProblemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["easy", "medium", "hard"], "Difficulty must be one of: easy, medium, hard"),
  editorial: z.string(),
  testCases: z.array(testCaseSchema),
});

export const updateProblemSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  difficulty: z
    .enum(["easy", "medium", "hard"], "Difficulty must be one of: easy, medium, hard")
    .optional(),
  editorial: z.string().optional(),
  testCases: z.array(testCaseSchema).optional(),
});

export const findByDifficultySchema = z.object({
  difficulty: z.enum(["easy", "medium", "hard"], "Difficulty must be one of: easy, medium, hard"),
});

export const searchProblemsSchema = z.object({
  query: z.string().min(1, "Query is required"),
});
