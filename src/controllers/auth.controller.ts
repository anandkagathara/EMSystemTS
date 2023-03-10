import { Request, Response } from "express";
import { createUser, logInUser } from "../services/auth.service";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await createUser(email, password);
  res.status(201).json({ message: "User created successfully", user });
};

export const logIn = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const token = await logInUser(email, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error: unknown) {
    // Explicitly type the error parameter using the 'unknown' type
    const statusCode = (error as any).statusCode || 500; // Use 'any' to access 'statusCode'
    const message = (error as any).message || "Internal Server Error"; // Use 'any' to access 'message'
    return res.status(statusCode).json({ message });
  }
};
