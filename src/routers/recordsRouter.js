import { Router } from "express";
import { checkUser, validateToken } from "../middlewares/authMiddlewares.js";
import {
  deleteTransaction,
  getTransactions,
  postTransaction,
  updateTransaction,
} from "../controllers/recordsControllers.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { recordSchema, editRecordSchema } from "../schemas/recordsSchemas.js";

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

recordsRouter.put(
  "/transactions",
  schemaMiddleware(editRecordSchema),
  validateToken,
  checkUser,
  updateTransaction
);

export default recordsRouter;
