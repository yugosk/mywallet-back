import {
  getTransactions,
  addTransaction,
} from "../controllers/financialController";
import { Router } from "express";
import userValidation from "../middlewares/userValidation";
import financialValidation from "../middlewares/financialValidation";

const financialRouter = Router();

financialRouter.get(
  "/transactions",
  userValidation,
  financialValidation,
  getTransactions
);
financialRouter.post(
  "/transactions",
  userValidation,
  financialValidation,
  addTransaction
);

export default financialRouter;
