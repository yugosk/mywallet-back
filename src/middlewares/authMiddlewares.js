import { findUserByEmail } from "../repositories/authRepository.js";
import { compareHash } from "../utils/encryptionUtils.js";
import { validate } from "../utils/tokenUtils.js";

export async function registerMiddleware(req, res, next) {
  const { email } = res.locals.body;

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
  const { email, password } = res.locals.body;
  try {
    const { rows } = await findUserByEmail(email);
    if (rows.length === 0) {
      return res.status(404).send("Email is not registered to an account");
    }
    const validPassword = await compareHash(password, rows[0].password);
    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }
    const { id, name } = rows[0];

    res.locals.userInfo = { id, name };

    next();
  } catch (err) {
    res.status(500).send("Unexpected error, try again later");
  }
}

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Invalid token");
  }

  try {
    const user = await validate(token);
    if (!user) {
      return res.status(401).send("Invalid token");
    }
    const { id } = user;
    res.locals.userId = id;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
}
