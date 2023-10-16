import connection from "../db/postgresql.js";

export async function getTransactionsByUserId(userId) {
  const { rows } = await connection.query(
    `SELECT * FROM records WHERE "userId" = $1 ORDER BY date;`,
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

export async function read(id) {
  const { rows } = await connection.query(
    `
    SELECT * FROM records WHERE id = $1
  `,
    [id]
  );
  return rows[0];
}

export async function deleteRecord(id) {
  return await connection.query(
    `
    DELETE FROM records WHERE id = $1
  `,
    [id]
  );
}
