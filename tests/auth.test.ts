import request from 'supertest';
import app from "../src/app";
import mongoose from "mongoose";
// import createUser from "../src/services/auth.service";
import User from "../src/models/user.model";

describe("Authentication API", () => {
  let user;
  let token;

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/myapp_test", {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
    });
  });

  describe("POST /login", () => {
    it("returns a token on successful login", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password123" })
        .expect(200);
      expect(response.body.token).toBeDefined();
    });

    it("returns an error for invalid credentials", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "wrongpassword" })
        .expect(401);
      expect(response.body.error).toBe("Invalid email or password");
    });
  });

  describe("GET /user", () => {
    it("returns user information for authenticated user", async () => {
      token = await user.generateAuthToken();
      const response = await request(app)
        .get("/user")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(response.body.email).toBe(user.email);
    });

    it("returns an error for unauthenticated user", async () => {
      const response = await request(app).get("/user").expect(401);
      expect(response.body.message).toBe("Unauthorized");
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
