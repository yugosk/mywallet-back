import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import financialRouter from "./routers/financialRouter.js";

dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(financialRouter);

server.listen(5000, () => console.log("Servidor iniciado na porta 5000"));
