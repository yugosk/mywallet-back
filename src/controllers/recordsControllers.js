import {
  deleteRecord,
  getTransactionsByUserId,
  insert,
  update,
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

export async function deleteTransaction(req, res) {
  const id = res.locals.id;
  try {
    await deleteRecord(id);
    return res.status(204).send("Record deleted succesfully");
  } catch (err) {
    return res.status(500).send("Unexpected error");
  }
}

export async function updateTransaction(req, res) {
  const id = res.locals.id;
  const { amount, date, description } = res.locals.body;

  try {
    await update(id, amount, date, description);
    return res.status(204).send("Record updated succesfully");
  } catch (err) {
    res.status(500).send("Unexpected error, try again later");
  }
}
