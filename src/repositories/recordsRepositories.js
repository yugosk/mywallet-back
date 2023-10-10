import connection from "../db/postgresql.js";

export async function getTransactionsByUserId(userId) {
  const { rows } = await connection.query(
    `SELECT * FROM records WHERE "userId" = $1;`,
    [userId]
  );
  return rows;
}

export async function insert(userId, type, amount, date, description) {
  return await connection.query(
    `INSERT INTO records ("userId", type, amount, date, description) VALUES ($1, $2, $3, $4, $5);`,
    [userId, type, amount, date, description]
  );
}
