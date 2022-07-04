import { db } from "../db/mongo";

async function userValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.sendStatus(422);
    return;
  }

  const session = await db.collection("sessions").findOne({ token });

  if (!session) {
    res.sendStatus(404);
    return;
  }

  res.locals.session = session;

  next();
}

export default userValidation;
