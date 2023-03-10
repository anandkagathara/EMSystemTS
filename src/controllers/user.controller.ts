import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const userService = new UserService();
      const users = await userService.getAllUsers();
      res.status(200).json({ users });
    } catch (error: any) {
      const statusCode = (error as any).statusCode || 500;
      const message = (error as any).message || "Internal Server Error";
      res.status(statusCode).json({ message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const userService = new UserService();
      const user = await userService.getUserById(userId);
      res.status(200).json({ user });
    } catch (error: any) {
      const statusCode = (error as any).statusCode || 500;
      const message = (error as any).message || "Internal Server Error";
      res.status(statusCode).json({ message });
    }
  }

  async updateUser(req: any, res: Response): Promise<void> {
    try {
      const userId = req.user._id.toString();
      const userService = new UserService();
      const updatedUser = await userService.updateUser(userId, req.body);
      res.status(200).json({ updatedUser });
    } catch (error: any) {
      const statusCode = (error as any).statusCode || 500;
      const message = (error as any).message || "Internal Server Error";
      res.status(statusCode).json({ message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const userService = new UserService();
      await userService.deleteUser(userId);
      res.status(204).send();
    } catch (error: any) {
      const statusCode = (error as any).statusCode || 500;
      const message = (error as any).message || "Internal Server Error";
      res.status(statusCode).json({ message });
    }
  }

   async updatePhoto(req: any, res: Response): Promise<void> {
    try {
      const id = req.user._id.toString();
      const imagePath = req.file.path;
      const userService = new UserService();
      const user = await userService.updatePhoto(id, imagePath);

      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}
