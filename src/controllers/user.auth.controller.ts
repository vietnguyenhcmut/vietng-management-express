// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { createUser, loginUser } from "../services/user.auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, ...data } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const newUser = await createUser({ email, password, ...data });

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const token = await loginUser({ email, password });
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).status(500).send("Internal Server Error");
  }
};
