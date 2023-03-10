import { UserDocument } from "../models/user.model";
import bcrypt from "bcrypt";
import User from "../models/user.model";

import jwt from "jsonwebtoken";

export const createUser = async (
  email: string,
  password: string
): Promise<UserDocument> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  return user;
};

export const logInUser = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw { statusCode: 401, message: "Invalid email or password" };
  }
  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw { statusCode: 401, message: "Invalid email or password" };
  }
  const token = jwt.sign({ userId: user._id }, "mysecretkey", {
    expiresIn: "1h",
  });

  return token;
};

export const getUserByEmail = async (
  email: string
): Promise<UserDocument | null> => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw { statusCode: 500, message: "Error getting user by email" };
  }
};

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string): Promise<UserDocument> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
