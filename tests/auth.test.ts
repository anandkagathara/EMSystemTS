
import { createUser, logInUser } from "../src/controllers/auth.controller";
import User from "../src/models/user.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connect, disconnect, ConnectOptions } from "mongoose";
import { string } from "joi";




describe("Auth Controller", () => {
  beforeAll(async () => {
    const options  = {
    }
    await connect("mongodb://localhost:27017/test-db", options);
  });

  afterAll(async () => {
    await disconnect();
  });


  describe("createUser", () => {
    it("should create a new user", async () => {
      const email = "testuser@test.com";
      const password = "testpassword";
      const user = await createUser(email, password);

      expect(user.email).toEqual(email);
      expect(user.password).not.toEqual(password);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      expect(isPasswordValid).toBeTruthy();
    });

    it("should throw an error if email already exists", async () => {
      const email = "testuser@test.com";
      const password = "testpassword";

      await expect(createUser(email, password)).rejects.toThrow(
        "Email already exists"
      );
    });
  });

  describe("logInUser", () => {
    it("should log in a user and return a JWT token", async () => {
      const email = "testuser@test.com";
      const password = "testpassword";
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
      });

      const token = await logInUser(email, password);


      const decodedToken = jwt.verify(token, "mysecretkey") as JwtPayload;
    
      expect(decodedToken.userId).toEqual(user._id.toString());
    });

    it("should throw an error if email is invalid", async () => {
      const email = "testuser@test.com";
      const password = "testpassword";

      await expect(logInUser("wrongemail@test.com", password)).rejects.toEqual(
        { statusCode: 401, message: "Invalid email or password" }
      );
    });

    it("should throw an error if password is invalid", async () => {
      const email = "testuser@test.com";
      const password = "testpassword";
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        password: hashedPassword,
      });

      await expect(logInUser(email, "wrongpassword")).rejects.toEqual({
        statusCode: 401,
        message: "Invalid email or password",
      });
    });
  });
});
