import z from "zod";
import {
  createProblemSchema,
  updateProblemSchema,
} from "../validators/problem.validator.js";

// export interface CreateProblemDto {
//   title: string;
//   description: string;
//   difficulty: "easy" | "medium" | "hard";
//   editorial?: string;
//   testCases: ITestCase[];
// }

// export interface UpdateProblemDto {
//   title?: string;
//   description?: string;
//   difficulty?: "easy" | "medium" | "hard";
//   editorial?: string;
//   testCases?: ITestCase[];
// }

export type CreateProblemDto = z.infer<typeof createProblemSchema>;
export type UpdateProblemDto = z.infer<typeof updateProblemSchema>;
