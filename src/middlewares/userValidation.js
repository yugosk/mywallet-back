import { db } from "../db/mongo";

async function userValidation(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  const session = await db.collection("sessions").findOne({ token });

  if (!session) {
    res.status(401).send("Não autorizado!");
    return;
  }

  res.locals.session = session;

  next();
}

export default userValidation;
