import { Router } from "express";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { loginUser, registerUser } from "../controllers/authControllers.js";
import {
  loginMiddleware,
  registerMiddleware,
} from "../middlewares/authMiddlewares.js";

const authRouter = Router();

authRouter.post(
  "/register",
  schemaMiddleware(registerSchema),
  registerMiddleware,
  registerUser
);

authRouter.post(
  "/login",
  schemaMiddleware(loginSchema),
  loginMiddleware,
  loginUser
);

export default authRouter;
