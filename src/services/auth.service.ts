// src/services/auth.service.ts
import { User } from "../../generated/prisma";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (
  userData: Omit<
    User,
    "id" | "firstName" | "lastName" | "phoneNumber" | "createdAt" | "updatedAt"
  >
) => {
  const { email, password } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const loginUser = async (
  loginData: Omit<
    User,
    "id" | "firstName" | "lastName" | "phoneNumber" | "createdAt" | "updatedAt"
  >
) => {
  const { email, password } = loginData;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "4h",
    }
  );

  return token;
};
