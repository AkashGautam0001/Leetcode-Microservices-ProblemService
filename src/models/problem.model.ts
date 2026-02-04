import mongoose, { Document } from "mongoose";

export interface ITestCase {
  input: string;
  output: string;
}

export interface IProblem extends Document {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: Date;
  updatedAt: Date;
  editorial?: string;
  testCases: ITestCase[];
}

const testCaseSetSchema = new mongoose.Schema<ITestCase>({
  input: { type: String, required: [true, "Input is required"], trim: true },
  output: {
    type: String,
    required: [true, "Output is required"],
    trim: true,
  },
});

const problemSchema = new mongoose.Schema<IProblem>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [200, "Title cannot exceed 200 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    difficulty: {
      type: String,
      enum: {
        values: ["easy", "medium", "hard"],
        message: "Difficulty must be either 'easy', 'medium', or 'hard'",
      },
      required: [true, "Difficulty is required"],
      default: "easy",
    },
    editorial: {
      type: String,
      trim: true,
    },
    testCases: [testCaseSetSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

problemSchema.index({ title: 1 }, { unique: true });
problemSchema.index({ difficulty: 1 });

export const Problem = mongoose.model<IProblem>("Problem", problemSchema);

export const TestCase = mongoose.model<ITestCase>(
  "TestCase",
  testCaseSetSchema,
);
