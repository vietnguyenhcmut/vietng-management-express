// src/routes/auth.route.ts
import express, { Express, Request, Response } from "express";
import {
  loginCustomer,
  registerCustomer,
} from "../services/customer.auth.service";

const router = express.Router();

router.post("/login", loginCustomer);
router.post("/register", registerCustomer);

export default router;
