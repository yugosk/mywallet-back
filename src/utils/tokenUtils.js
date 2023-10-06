import jwt from "jsonwebtoken";

const jwtKey = process.env.JWT_SECRET;

export async function sign(id) {
  return jwt.sign({ id }, jwtKey, { expiresIn: "1h" });
}

export async function validate(token) {
  return jwt.verify(token, jwtKey);
}
