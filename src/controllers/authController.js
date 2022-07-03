import joi from "joi";
import { v4 as uuid } from "uuid";
import { db } from "../db/mongo.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const newUser = req.body;
  const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
  });

  const { error } = userSchema.validate(newUser);

  if (error) {
    res.status(422).send("INSERIR O ERRO AQUI");
    return;
  }

  const encryptedPassword = bcrypt.hashSync(newUser.password, 10);

  await db.collection("users").insertOne({
    name: newUser.name,
    email: newUser.email,
    password: encryptedPassword,
  });
  res.status(201).send("Usuário criado com sucesso!");
}

export async function loginUser(req, res) {
  const user = req.body;
  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { error } = userSchema.validate(user);

  if (error) {
    res.status(422).send("INSERIR O ERRO AQUI");
    return;
  }

  const dbUser = await db.collection("users").findOne({ email: user.email });
  if (dbUser && bcrypt.compareSync(user.password, dbUser.password)) {
    const sessionToken = uuid();

    await db.collection("sessions").insertOne({
      token: sessionToken,
      userId: dbUser._id,
    });

    res.status(201).send({ sessionToken });
    return;
  } else {
    res.status(401).send("E-mail ou senha incorreto(a)(s)!");
  }
}
