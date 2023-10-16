import joi from "joi";

const recordSchema = joi.object({
  type: joi.string().valid("out", "in").required(),
  amount: joi.number().precision(2).required(),
  date: joi.date().iso().required(),
  description: joi.string().required(),
});

const editRecordSchema = joi.object({
  amount: joi.number().precision(2).required(),
  date: joi.date().iso().required(),
  description: joi.string().required(),
});

export { recordSchema, editRecordSchema };
