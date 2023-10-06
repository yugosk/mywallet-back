import connection from "../db/postgresql.js";

export async function findUserByEmail(email) {
  return connection.query("SELECT * FROM users WHERE email = $1", [email]);
}

export async function createUser(email, name, password) {
  connection.query(
    "INSERT INTO users (email, name, password) VALUES ($1, $2, $3)",
    [email, name, password]
  );
}
