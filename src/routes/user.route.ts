import express from "express";
import { getUser } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/about-me", authenticateToken, getUser);

export default router;
