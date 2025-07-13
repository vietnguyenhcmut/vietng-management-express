import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

/**
 * Xác thực thông tin đăng nhập của khách hàng và trả về JWT.
 * @param loginData - Đối tượng chứa email và password của khách hàng.
 * @returns Một chuỗi accessToken (JWT).
 */

export const registerCustomer = async (
  customerData: Prisma.CustomerCreateInput
) => {
  const { password, ...restData } = customerData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const customer = await prisma.customer.create({
    data: {
      ...restData,
      password: hashedPassword,
    },
  });

  const { password: _, ...customerWithoutPassword } = customer;
  return customerWithoutPassword;
};

export const loginCustomer = async (
  loginData: Pick<Prisma.CustomerCreateInput, "email" | "password">
) => {
  const { email, password } = loginData;

  const customer = await prisma.customer.findUnique({
    where: { email },
  });

  if (!customer) {
    throw new Error("Email hoặc mật khẩu không chính xác.");
  }

  const isPasswordValid = await bcrypt.compare(password, customer.password);

  if (!isPasswordValid) {
    throw new Error("Email hoặc mật khẩu không chính xác.");
  }

  const token = jwt.sign({ customerId: customer.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return token;
};
