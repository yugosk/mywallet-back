import { Router } from "express";
import { checkUser, validateToken } from "../middlewares/authMiddlewares.js";
import {
  deleteTransaction,
  getTransactions,
  postTransaction,
} from "../controllers/recordsControllers.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { recordSchema } from "../schemas/recordsSchemas.js";

const recordsRouter = Router();

recordsRouter.get("/transactions", validateToken, getTransactions);
recordsRouter.post(
  "/transactions",
  schemaMiddleware(recordSchema),
  validateToken,
  postTransaction
);
recordsRouter.delete(
  "/transactions",
  validateToken,
  checkUser,
  deleteTransaction
);

export default recordsRouter;
