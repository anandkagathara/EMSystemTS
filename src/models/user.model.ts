
import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  photoUrl?: string;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    gender: { type: String, required: false },
    photoUrl: { type: String, required: false , default:null},
  },
  { timestamps: true }
);

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
