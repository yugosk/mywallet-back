import { Router } from "express";
import authRouter from "./authRouter.js";
import { validateToken } from "../middlewares/authMiddlewares.js";
import {
  getTransactions,
  postTransaction,
} from "../controllers/recordsControllers.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { recordSchema } from "../schemas/recordsSchemas.js";

const recordsRouter = Router();

authRouter.get("/transactions", validateToken, getTransactions);
authRouter.post(
  "/transactions",
  schemaMiddleware(recordSchema),
  validateToken,
  postTransaction
);

export default recordsRouter;
