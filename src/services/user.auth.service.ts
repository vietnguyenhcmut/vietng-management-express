import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

export const createUser = async (userData: Prisma.UserCreateInput) => {
  const { password, ...restData } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { ...restData, password: hashedPassword },
  });
  return user;
};

export const loginUser = async (
  loginData: Pick<Prisma.UserCreateInput, "email" | "password">
) => {
  const { email, password } = loginData;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Thông tin đăng nhập không hợp lệ");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Thông tin đăng nhập không hợp lệ");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return token;
};
