import { Router } from "express";
import authRouter from "./authRouter.js";
import recordsRouter from "./recordsRouter.js";

const router = Router();

router.use("/", authRouter);
router.use("/", recordsRouter);

export default router;
