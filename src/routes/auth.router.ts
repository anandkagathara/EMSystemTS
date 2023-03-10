import express from "express";
import { signUp, logIn } from "../controllers/auth.controller";
import {
  validateLogin,
  validateSignup,
} from "../middlewares/validation.middleware";

const router = express.Router();

router.post("/signUp", validateSignup, signUp);

router.post("/logIn", validateLogin, logIn);

export { router as authRouter };
