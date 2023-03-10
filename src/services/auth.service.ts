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
  const user = await User.findOne({ email });
  if (!user) {
    throw { statusCode: 401, message: "Invalid email or password" };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { statusCode: 401, message: "Invalid email or password" };
  }
  const token = jwt.sign({ userId: user._id }, "mysecretkey", {
    expiresIn: "1h",
  });

  return token;
};
