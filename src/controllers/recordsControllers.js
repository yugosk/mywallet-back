import {
  getTransactionsByUserId,
  insert,
} from "../repositories/recordsRepositories.js";

export async function getTransactions(req, res) {
  const userId = res.locals.userId;
  const transactions = await getTransactionsByUserId(userId);
  res.status(200).send(transactions);
}

export async function postTransaction(req, res) {
  const userId = res.locals.userId;
  const { type, amount, date, description } = res.locals.body;

  try {
    await insert(userId, type, amount, date, description);
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send("Unexpected error, try again later");
  }
}
