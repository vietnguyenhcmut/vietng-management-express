// src/routes/auth.route.ts
import express, { Express, Request, Response } from "express";
import { login, register } from "../controllers/user.auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

export default router;
