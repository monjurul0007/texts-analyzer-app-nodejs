import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

interface ErrorResponse {
  status: string;
  message: string;
  errorCode?: string;
  errors?: any[];
  stack?: string;
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let response: ErrorResponse = {
    status: "error",
    message: "Internal server error",
  };

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    response = {
      status: err.status,
      message: err.message,
    };
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    response = {
      status: "fail",
      message: "Validation failed",
      errors: Object.values((err as any).errors).map((error) => ({
        field: (error as any).path,
        message: (error as any).message,
      })),
    };
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  console.error("[Error]:", {
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    errorMessage: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json(response);
};
