import {
  getTransactions,
  addTransaction,
} from "../controllers/financialController";
import { Router } from "express";
import userValidation from "../middlewares/userValidation";

const financialRouter = Router();

financialRouter.get("/transactions", userValidation, getTransactions);
financialRouter.post("/transactions", userValidation, addTransaction);

export default financialRouter;
