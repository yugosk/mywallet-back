import { findUserByEmail } from "../repositories/authRepository.js";
import { compareHash } from "../utils/encryptionUtils.js";

export async function registerMiddleware(req, res, next) {
  const { email } = res.locals.user;

  try {
    const { rowCount } = await findUserByEmail(email);
    if (rowCount !== 0) {
      return res.status(409).send("Email already in use");
    } else {
      next();
    }
  } catch (err) {
    res.status(500).send("Unexpected error, try again later");
  }
}

export async function loginMiddleware(req, res, next) {
  const { email, password } = res.locals.user;
  try {
    const { rows } = await findUserByEmail(email);
    if (rows.length === 0) {
      return res.status(404).send("Email is not registered to an account");
    }
    const validPassword = await compareHash(password, rows[0].password);
    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }
    console.log(rows[0]);
    const { id, name } = rows[0];

    res.locals.userInfo = { id, name };

    next();
  } catch (err) {
    res.status(500).send("Unexpected error, try again later");
  }
}
