import { db, objectId } from "../db/mongo";
import joi from "joi";
import dayjs from "dayjs";

export async function getTransactions(req, res) {
  const session = res.locals.session;
  const transactions = await db
    .collection("transactions")
    .find({ userId: new objectId(session.userId) })
    .toArray();

  res.send(transactions);
}

export async function addTransaction(req, res) {
  const session = res.locals.session;
  const transaction = req.body;

  const transactionSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.valid("inflow", "outflow"),
  });

  const { error } = transactionSchema.validate(transaction);

  if (error) {
    res.status(422).send("COLOCAR O ERRO AQUI DEPOIS");
    return;
  }
  await db.collection("transactions").insertOne({
    ...transaction,
    date: dayjs().format("DD/MM"),
    userId: session.userId,
  });
  res.status(201).send("Movimentação adicionada com sucesso!");
}
