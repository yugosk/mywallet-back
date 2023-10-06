import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../repositories/authRepository.js";
import { compareHash, hashPassword } from "../utils/encryptionUtils.js";

export async function registerUser(req, res) {
  const { name, email, password } = res.locals.user;

  try {
    const hashedPassword = await hashPassword(password);
    await createUser(email, name, hashedPassword);
    return res.status(201).send("Success creating new user");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("There was as error creating new user, try again later");
  }
}

export async function loginUser(req, res) {
  const { id, name } = res.locals.userInfo;
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).send({ token, name });
  } catch (err) {
    res.status(500).send("Unexpected error, try again later");
  }
}