import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers/router.js";

dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());
server.use(router);

server.listen(process.env.PORT, () => {
  console.log("Server running at port " + process.env.PORT);
});
