import User from "../models/user.model";

export class UserService {
  public async getAllUsers(): Promise<any> {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      throw { statusCode: 500, message: error.message };
    }
  }

  public async getUserById(id: string): Promise<any> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw { statusCode: 404, message: "User not found" };
      }
      return user;
    } catch (error: any) {
      throw { statusCode: 500, message: error.message };
    }
  }

  public async updateUser(id: string, update: Partial<any>): Promise<any> {
    try {
      const user = await User.findByIdAndUpdate(id, update, { new: true });
      if (!user) {
        throw { statusCode: 404, message: "User not found" };
      }
      return user;
    } catch (error: any) {
      throw { statusCode: 500, message: error.message };
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw { statusCode: 404, message: "User not found" };
      }
    } catch (error: any) {
      throw { statusCode: 500, message: error.message };
    }
  }

  public async updatePhoto(id: string, imagePath: string): Promise<any> {
    try {
      const user: any = await User.findById(id);

      if (!user) {
        throw { statusCode: 404, message: "User not found" };
      }
      user.photoUrl = imagePath;
      await user.save();
      return user;
    } catch (error: any) {
      throw { statusCode: 500, message: error.message };
    }
  }
}
