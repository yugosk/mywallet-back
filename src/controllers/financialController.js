import { db } from "../db/mongo.js";
import dayjs from "dayjs";

export async function getTransactions(req, res) {
  const session = res.locals.session;

  try {
    const transactions = await db
      .collection("transactions")
      .find({ userId: session.userId })
      .toArray();
    res.status(200).send(transactions);
  } catch {
    res.sendStatus(500);
  }
}

export async function addTransaction(req, res) {
  const session = res.locals.session;
  const transaction = res.locals.transaction;

  try {
    await db.collection("transactions").insertOne({
      ...transaction,
      date: dayjs().format("DD/MM"),
      userId: session.userId,
    });
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
    return;
  }
}
