import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hashSync(password, salt);
}

export async function compareHash(password, hash) {
  return bcrypt.compareSync(password, hash);
}
