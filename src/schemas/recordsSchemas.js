import joi from "joi";

export const recordSchema = joi.object({
  type: joi.string().valid("out", "in").required(),
  amount: joi.number().precision(2).required(),
  date: joi.date().iso().required(),
  description: joi.string().required(),
});
