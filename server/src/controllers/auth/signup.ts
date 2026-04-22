import { type Request, type Response } from "express";
import validateSignupData from "../../validations/auth/signup.js";
import signupService from "../../services/auth/signup.js";

export default async function signupController(req: Request, res: Response) {
  const result = validateSignupData(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid signup data",
      errors: result.error.issues.map((issue) => issue.message),
    });
  }

  try {
    const data = await signupService(result.data);
    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: data.message,
      });
    }

    return res.status(201).json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create user";
    const statusCode =
      message === "Email already exists" || message === "Username already exists"
        ? 409
        : 500;

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}
