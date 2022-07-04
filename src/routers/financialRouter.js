import {
  getTransactions,
  addTransaction,
} from "../controllers/financialController.js";
import { Router } from "express";
import userValidation from "../middlewares/userValidation.js";
import financialValidation from "../middlewares/financialValidation.js";

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
