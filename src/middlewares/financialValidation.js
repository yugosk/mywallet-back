import { db } from "../db/mongo";
import joi from "joi";
import { validate } from "uuid";

async function financialValidation(req, res, next) {
  const transactionSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.valid("inflow", "outflow"),
  });

  const transaction = req.body;

  const { error } = transactionSchema.validate(newTransaction);

  if (error) {
    res.sendStatus(422);
    return;
  }

  res.locals.transaction = transaction;

  next();
}

export default financialValidation;
